-- ✅ Insert book function (Tested)
CREATE
OR REPLACE FUNCTION insert_book (
    isbn BIGINT,
    title TEXT,
    amhr_title TEXT,
    authors TEXT,
    synopsis TEXT,
    amhr_synopsis TEXT,
    publisher TEXT,
    publication_date DATE,
    price DECIMAL(10, 2),
    is_hardcover BOOLEAN,
    quantity BIGINT,
    genre TEXT DEFAULT NULL,
    addition_tmstmp TIMESTAMPTZ DEFAULT NOW(), -- Set addition timestamp
    cover_page_urls TEXT[] DEFAULT NULL
) RETURNS VOID LANGUAGE plpgsql AS $$
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

-- ✅ Delete user function (Tested)
-- This function deletes a user if they are either an admin or a customer
CREATE
OR REPLACE FUNCTION delete_user (user_id UUID) RETURNS VOID LANGUAGE plpgsql AS $$ 
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
    $$;

-- ✅ Update book function (Tested)
CREATE
OR REPLACE FUNCTION update_book (
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
    price DECIMAL(10, 2) DEFAULT NULL,
    is_hardcover BOOLEAN DEFAULT NULL,
    quantity BIGINT DEFAULT NULL,
    cover_page_urls TEXT[] DEFAULT NULL
) RETURNS VOID LANGUAGE plpgsql AS $$
    BEGIN
        IF EXISTS (SELECT 1 FROM books WHERE books.book_id = update_book.book_id AND books.is_deleted = FALSE) THEN
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
            RAISE EXCEPTION 'Cannot update book. Either the book has been soft-deleted or it does not exist';
        END IF;
    END;
    $$;

-- ✅ Read book function (Tested)
-- 
-- This query excludes respects is_deleted when retrieveing a book with the specified pattern or isbn.
-- It searches using author, and title, as well an array of genres
-- If genre_param is not NULL, (genre_param = ARRAY[]::TEXT[] OR ...) checks whether genre_param is an empty array. ARRAY[]::TEXT[] 
-- represents an empty array of text type. If genre_param is an empty array, it means that no specific genre filtering is requested, 
-- and it allows all rows to pass this condition as well.
CREATE
OR REPLACE FUNCTION retrieve_books (
    pattern TEXT DEFAULT NULL,
    genre_param TEXT[] DEFAULT NULL
) RETURNS TABLE (
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
    price DECIMAL(10, 2),
    is_hardcover BOOLEAN,
    average_rating DECIMAL(2, 1),
    quantity BIGINT,
    addition_tmstmp TIMESTAMPTZ,
    cover_page_urls TEXT[]
) LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY 
        SELECT 
            books.book_id,
            books.isbn,
            books.title,
            books.amhr_title,
            books.authors,
            books.synopsis,
            books.amhr_synopsis,
            books.genre,
            books.publisher,
            books.publication_date,
            books.price,
            books.is_hardcover,
            books.average_rating,
            books.quantity,
            books.addition_tmstmp,
            books.cover_page_urls
        FROM
            books
        WHERE 
            (pattern IS NULL OR
             (books.authors ILIKE pattern OR
              books.title ILIKE pattern OR
              books.amhr_title ILIKE pattern))
            AND (genre_param IS NULL OR
                 (genre_param = ARRAY[]::TEXT[] OR
                  books.genre = ANY (genre_param)))
            AND books.is_deleted = FALSE;
END;
$$;

-- Call the function like this:
-- SELECT * FROM retrieve_books('t%', Array['genre1', 'genre2']);
-- ================================================================================================================ 
-- REMOVED - Delete book function - this is cause we can't delete files (coverpages) from the bucket using sql
-- ================================================================================================================
-- ✅ Book purchase function (Tested)
CREATE
OR REPLACE FUNCTION buy_books (customer_id UUID, book_id BIGINT, quantity BIGINT) RETURNS VOID LANGUAGE plpgsql AS $$
    DECLARE
        book_quantity INTEGER;
        book_price NUMERIC;
    BEGIN
        
        -- Check valid book_id and retrieve book quantity and price once
        SELECT books.quantity, books.price 
        INTO book_quantity, book_price
        FROM books
        WHERE books.book_id = buy_books.book_id;
        IF NOT FOUND THEN 
            RAISE EXCEPTION 'Book with given book_id was not found in relation books.';
        END IF;

        -- Check quantity validity
        IF (buy_books.quantity < 1 OR buy_books.quantity IS NULL) THEN 
            RAISE EXCEPTION 'Invalid quantity. Quantity of books inserted is less than 1 or NULL.';
        END IF;
    
        -- Check availability
        IF (book_quantity < quantity) THEN
            RAISE EXCEPTION 'Book quantity specified exceeds quantity available.';
        END IF;
    
        -- Update quantity in books table
        UPDATE books
        SET quantity = books.quantity - buy_books.quantity
        WHERE books.book_id = buy_books.book_id;
    
        -- Insert purchase record
        INSERT INTO purchases (customer_id, book_id, amount)
        VALUES (buy_books.customer_id, buy_books.book_id, book_price * quantity);
    END;
    $$;

-- ✅ Checks if the currently logged in user is an admin
CREATE
OR REPLACE FUNCTION is_admin () RETURNS BOOLEAN LANGUAGE plpgsql AS $$
BEGIN
    IF EXISTS (SELECT admin_id FROM public.admins WHERE admin_id = auth.uid()) THEN
    RETURN TRUE;
    ELSE 
    RETURN FALSE;
    END IF;
END;

-- Checks if the currently logged in user is a customer
CREATE
OR REPLACE FUNCTION is_customer () RETURNS BOOLEAN LANGUAGE plpgsql AS $$
BEGIN IF EXISTS (
    SELECT
        customer_id
    FROM
        public.customers
    WHERE
        customer_id = auth.uid ()
) THEN RETURN TRUE;

ELSE RETURN FALSE;

END IF;

END;

$$

-- Get prioritized books by joining the books and prioritized_books table
CREATE
OR REPLACE FUNCTION retrieve_prioritized_books () RETURNS SETOF books LANGUAGE plpgsql AS $$
BEGIN RETURN QUERY
SELECT
    books.*
FROM
    books
    JOIN prioritized_books ON books.book_id = prioritized_books.book_id
WHERE
    books.is_deleted = FALSE;

END;

$$;

-- Returns similar books based on the genre or author name
-- The condition checks that the current book listed is not also shown in the 'Similar Books' Section
CREATE
OR REPLACE FUNCTION retrieve_similar_books (
    book_id_param INT DEFAULT -1,
    genre_param TEXT DEFAULT NULL,
    authors_param TEXT DEFAULT NULL
) RETURNS SETOF books LANGUAGE plpgsql AS $$
BEGIN
    RETURN QUERY
    SELECT
        books.*
    FROM
        books
    WHERE (books.book_id != book_id_param) AND (books.is_deleted = FALSE) AND ((books.genre = genre_param)
        OR (books.authors = authors_param));
END;
$$;

