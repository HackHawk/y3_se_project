-- =============== Stored functions v2.0 ============================================================ 

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
-- Delete customer function
-- ================================================================================================================

CREATE OR REPLACE FUNCTION delete_customer(customer_id UUID)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN 
    -- Delete the customer from auth.users
    DELETE FROM auth.users WHERE id = customer_id;
    -- Since the customer relation was created with 'ON DELETE CASCADE' the custoemr will also be automatically deleted
END;
$$;

