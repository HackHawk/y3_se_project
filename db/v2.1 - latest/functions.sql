-- TODO create is_deleted flag compliant crud functions for books relation

-- ================================================================================================================ 
-- TODO Create book function 
-- ================================================================================================================

-- ================================================================================================================ 
-- TODO Update book function 
-- ================================================================================================================


-- ================================================================================================================ 
-- Read book function 
-- ================================================================================================================

-- This query excludes is_deleted and cover_page_urls and respects is_deleted.
CREATE OR REPLACE FUNCTION retrieve_books (
    pattern TEXT DEFAULT NULL,
    book_id BIGINT DEFAULT NULL, 
    isbn BIGINT DEFAULT NULL, 
    genre TEXT DEFAULT NULL
)
RETURNS TABLE (
    book_id BIGSERIAL,
    isbn BIGINT UNIQUE,
    title TEXT NOT NULL,
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
    addition_tmstmp TIMESTAMPTZ,
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
-- Delete book function 
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
--  Book purchase procedure
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
$$

-- ================================================================================================================ 
--  Delete user function
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
