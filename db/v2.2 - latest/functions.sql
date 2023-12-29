-- TODO create is_deleted flag compliant crud functions for books relation

-- ================================================================================================================ 
-- TESTME Insert book function 
-- ================================================================================================================

CREATE OR REPLACE FUNCTION insert_book(
    isbn BIGINT,
    title TEXT,
    amhr_title TEXT,
    authors TEXT,
    synopsis TEXT,
    amhr_synopsis TEXT,
    publisher TEXT,
    publication_date DATE,
    price MONEY,
    is_hardcover BOOLEAN,
    quantity BIGINT,
    genre TEXT DEFAULT NULL,
    addition_tmstmp TIMESTAMPTZ DEFAULT NOW(), -- Set addition timestamp
    cover_page_urls TEXT[] DEFAULT NULL
) RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO books (
        isbn,
        title,
        amhr_title,
        authors,
        synopsis,
        amhr_synopsis,
        genre,
        publisher,
        publication_date,
        price,
        is_hardcover,
        quantity,
        addition_tmstmp,
        is_deleted,
        cover_page_urls
    ) VALUES (
        isbn,
        title,
        amhr_title,
        authors,
        synopsis,
        amhr_synopsis,
        genre,
        publisher,
        publication_date,
        price,
        is_hardcover,
        quantity,
        addition_tmstmp,  
        FALSE,  -- Set is_deleted to FALSE
        cover_page_urls
    );
END;
$$;


-- ================================================================================================================ 
-- TESTME Update book function 
-- ================================================================================================================

CREATE OR REPLACE FUNCTION update_book (
    book_id BIGINT,
    isbn BIGINT DEFAULT NULL,
    title TEXT DEFAULT NULL,
    amhr_title TEXT DEFAULT NULL,
    authors TEXT DEFAULT NULL,
    synopsis TEXT DEFAULT NULL,
    amhr_synopsis TEXT DEFAULT NULL,
    genre TEXT DEFAULT NULL,
    publisher TEXT DEFAULT NULL,
    publication_date DATE DEFAULT NULL,
    price MONEY DEFAULT NULL,
    is_hardcover BOOLEAN DEFAULT NULL,
    quantity BIGINT DEFAULT NULL,
    cover_page_urls TEXT[] DEFAULT NULL
) RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM books WHERE books.book_id = update_book.book_id AND is_deleted = FALSE) THEN
        UPDATE books
        SET isbn = COALESCE(update_book.isbn, books.isbn),  -- Preserve existing ISBN if null
            title = COALESCE(update_book.title, books.title),  -- Preserve existing title if null
            amhr_title = COALESCE(update_book.amhr_title, books.amhr_title),
            authors = COALESCE(update_book.authors, books.authors),
            synopsis = COALESCE(update_book.synopsis, books.synopsis),
            amhr_synopsis = COALESCE(update_book.amhr_synopsis, books.amhr_synopsis),
            genre = COALESCE(update_book.genre, books.genre),
            publisher = COALESCE(update_book.publisher, books.publisher),
            publication_date = COALESCE(update_book.publication_date, books.publication_date),
            price = COALESCE(update_book.price, books.price),
            is_hardcover = COALESCE(update_book.is_hardcover, books.is_hardcover),
            quantity = COALESCE(update_book.quantity, books.quantity),
            cover_page_urls = COALESCE(update_book.cover_page_urls, books.cover_page_urls)
        WHERE books.book_id = update_book.book_id;
    ELSE
        RAISE EXCEPTION 'Cannot update book because it is deleted. Either is_deleted is false or it does not exist';
    END IF;
END;
$$;
select update_book (book_id => 13, title => 'The Shadowy Queen');

-- ================================================================================================================ 
-- TESTME -- FIXME Read book function 
-- ================================================================================================================

-- This query excludes is_deleted and cover_page_urls and respects is_deleted.
CREATE OR REPLACE FUNCTION retrieve_books (
        pattern TEXT DEFAULT NULL,
        input_book_id BIGINT DEFAULT NULL, 
        input_isbn BIGINT DEFAULT NULL
    )
    RETURNS TABLE (
        book_id BIGINT,
        isbn BIGINT,
        title TEXT,
        amhr_title TEXT,
        authors TEXT,
        synopsis TEXT,
        amhr_synopsis TEXT,
        genre TEXT,
        publisher TEXT,
        publication_date DATE,
        price MONEY,
        is_hardcover BOOLEAN,
        average_rating DECIMAL(2, 1),
        quantity BIGINT,
        addition_tmstmp TIMESTAMPTZ
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN   
        RETURN QUERY
            SELECT 
                book_id,
                isbn,
                title,
                amhr_title,
                authors,
                synopsis,
                amhr_synopsis,
                genre,
                publisher,
                publication_date,
                price,
                is_hardcover,
                average_rating,
                quantity,
                addition_tmstmp
            FROM
                books
            WHERE 
                books.is_deleted = FALSE AND (
                    books.book_id = retrieve_books.book_id OR
                    books.authors ILIKE pattern OR
                    books.title ILIKE pattern OR
                    books.amhr_title ILIKE pattern
                ); 

    END;
    $$;

-- ================================================================================================================ 
-- TESTME Delete book function 
-- ================================================================================================================

CREATE OR REPLACE FUNCTION delete_book(book_id_param BIGINT)
    RETURNS VOID
    LANGUAGE plpgsql
    AS $$
    DECLARE
        cover_page_paths TEXT[];
        i INTEGER;
    BEGIN
        BEGIN
            -- Get the cover page paths for the book
            SELECT cover_page_urls INTO STRICT cover_page_paths FROM public.books WHERE book_id = book_id_param;

            -- Check if the book has been purchased
            IF EXISTS (SELECT 1 FROM public.purchases WHERE book_id = book_id_param) THEN
                -- Soft delete the book
                UPDATE public.books
                SET is_deleted = TRUE,
                    isbn = NULL,
                    synopsis = NULL,
                    amhr_synopsis = NULL,
                    genre = NULL,
                    publisher = NULL,
                    publication_date = NULL,
                    price = NULL,
                    is_hardcover = NULL,
                    average_rating = NULL,
                    quantity = NULL,
                    addition_tmstmp = NULL
                WHERE book_id = book_id_param;
            ELSE
                -- Delete the book
                DELETE FROM public.books WHERE book_id = book_id_param;
            END IF;

            -- Delete corresponding customer reviews
            DELETE FROM public.customer_reviews WHERE book_id = book_id_param;

            -- Delete prioritization records
            DELETE FROM public.prioritized_books WHERE book_id = book_id_param;

            -- Delete the cover pages from the storage bucket
            FOR i IN 1..array_length(cover_page_paths, 1) LOOP
                PERFORM supabase.storage.remove(cover_page_paths[i]);
            END LOOP;

            -- Clear the cover page URLs in the database
            UPDATE public.books
            SET cover_page_urls = NULL
            WHERE book_id = book_id_param;
        END;
    END;
    $$;

-- ================================================================================================================ 
--  TESTME Book purchase function
-- ================================================================================================================

-- Assumes that the customer UUID and book_id are valid
CREATE OR REPLACE FUNCTION buy_books(customer_id UUID, book_id BIGINT, quantity BIGINT)
    RETURNS BOOLEAN
    LANGUAGE plpgsql
    AS $$
    BEGIN
        BEGIN
          -- Check whether quantity is less than 1
          IF (buy_books.quantity < 1 OR buy_books.quantity = NULL) THEN 
            RAISE EXCEPTION 'Invalid quantity. Quantity of books inserted is less than 1 or is NULL.';
          END IF;

          -- Check for sufficient quantity
          IF ((SELECT quantity FROM books WHERE books.book_id = buy_books.book_id) < quantity) THEN
            RAISE EXCEPTION 'Insufficient book quantity available.';
          END IF;

          -- Update quantity in books table
          UPDATE books
          SET quantity = books.quantity - buy_books.quantity
          WHERE books.book_id = buy_books.book_id;

          -- Insert purchase record
          INSERT INTO purchases (customer_id, book_id, amount)
          VALUES (buy_books.customer_id, buy_books.book_id, (SELECT price FROM books WHERE book_id = buy_books.book_id) * quantity);

          RETURN TRUE;  -- Indicate successful purchase

        END;
    END;
    $$;

-- ================================================================================================================ 
--  Delete user function (Tested)
-- ================================================================================================================

-- This function deletes a user if they are either an admin or a customer
CREATE OR REPLACE FUNCTION delete_user(user_id UUID) 
    RETURNS VOID
    LANGUAGE plpgsql
    AS $$ 
    BEGIN 
        BEGIN
            -- Check if the user is a super admin
            IF EXISTS (SELECT sp_admin_id FROM sp_admin WHERE sp_admin_id = user_id) THEN
                RAISE EXCEPTION 'User cannot be deleted because they are a super admin';
            END IF;

            -- Perform deletion only if user exists either in admin or cusotmers
            IF EXISTS (SELECT 1 FROM customers WHERE customer_id = user_id) THEN 
                DELETE FROM auth.users WHERE id = user_id;
            ELSIF EXISTS (SELECT 1 FROM admins WHERE admin_id = user_id) THEN
                DELETE FROM auth.users WHERE id = user_id;
            ELSE 
                RAISE EXCEPTION 'User does not exist, or is not an admin or a customer';
            END IF;

        END;
    END;
    $$
