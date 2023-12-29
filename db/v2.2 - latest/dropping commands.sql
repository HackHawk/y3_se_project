-- ================================================================================================================ 
-- Dropping tables
-- ================================================================================================================
-- CASCADE is used to specify that it should drop dependent objects (like policies) too.

DROP TABLE public.purchases CASCADE;
DROP TABLE public.customer_reviews CASCADE;
DROP TABLE public.customers CASCADE;
DROP TABLE public.sp_admin CASCADE;
DROP TABLE public.admins CASCADE;
DROP TABLE public.prioritized_books CASCADE;
DROP TABLE public.books CASCADE;
DROP TABLE public.genres CASCADE;

-- ================================================================================================================ 
-- Dropping functions
-- ================================================================================================================

DROP FUNCTION delete_book(BIGINT);
DROP FUNCTION retrieve_books(TEXT, BIGINT, BIGINT, TEXT);
DROP FUNCTION buy_books(UUID, BIGINT, BIGINT);

-- ================================================================================================================ 
-- Dropping triggers
-- ================================================================================================================

DROP TRIGGER IF EXISTS create_customer_trigger ON auth.users;
DROP FUNCTION IF EXISTS create_customer();

--

