-- =============== Stored functions v2.0 ============================================================ 
-- TODO create is_deleted flag compliant crud functions for books relation

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
    -- Get the cover page paths for the book
    SELECT cover_page_urls INTO cover_page_paths FROM public.books WHERE book_id = book_id_param;

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
$$

