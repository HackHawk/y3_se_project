-- ===============================================================================================================
-- Database schema v2.2
-- ===============================================================================================================

-- Contractions - C: Create, R: Read, U:Update, D:Delete

BEGIN;

CREATE TABLE
  IF NOT EXISTS PUBLIC.genres (genre_name TEXT PRIMARY KEY);

ALTER TABLE PUBLIC.genres ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  IF NOT EXISTS PUBLIC.books (
    book_id BIGSERIAL PRIMARY KEY,
    isbn BIGINT UNIQUE,
    title TEXT NOT NULL,
    amhr_title TEXT,
    authors TEXT,
    synopsis TEXT,
    amhr_synopsis TEXT,
    genre TEXT,
    publisher TEXT,
    publication_date DATE,
    price DECIMAL(10, 2) CHECK (price > 0 OR price = 0 OR price = NULL),
    is_hardcover BOOLEAN,
    average_rating DECIMAL(2, 1) DEFAULT 0,
    quantity BIGINT CHECK (quantity > 0 OR quantity = 0 OR quantity = NULL),
    addition_tmstmp TIMESTAMPTZ DEFAULT NOW () NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    cover_page_urls TEXT [],
    FOREIGN KEY (genre) REFERENCES PUBLIC.genres (genre_name) ON UPDATE CASCADE ON DELETE SET NULL
  );

ALTER TABLE PUBLIC.books ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  IF NOT EXISTS PUBLIC.prioritized_books (
    book_id BIGINT PRIMARY KEY,
    FOREIGN KEY (book_id) REFERENCES PUBLIC.books (book_id) ON UPDATE CASCADE ON DELETE CASCADE
  );

ALTER TABLE PUBLIC.prioritized_books ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  IF NOT EXISTS PUBLIC.admins (
    admin_id UUID PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

ALTER TABLE PUBLIC.admins ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  IF NOT EXISTS PUBLIC.sp_admin (
    sp_admin_id UUID PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    FOREIGN KEY (sp_admin_id) REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

ALTER TABLE PUBLIC.sp_admin ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  IF NOT EXISTS PUBLIC.customers (
    customer_id UUID PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE
  );

ALTER TABLE PUBLIC.customers ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  IF NOT EXISTS PUBLIC.customer_reviews (
    customer_id UUID NOT NULL,
    book_id BIGINT NOT NULL,
    rating SMALLINT DEFAULT 0,
    COMMENT TEXT,
    PRIMARY KEY (customer_id, book_id),
    FOREIGN KEY (customer_id) REFERENCES PUBLIC.customers (customer_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES PUBLIC.books (book_id) ON DELETE CASCADE
  );

ALTER TABLE PUBLIC.customer_reviews ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  IF NOT EXISTS PUBLIC.purchases (
    customer_id UUID NOT NULL,
    book_id BIGINT NOT NULL,
    purchase_timestamp TIMESTAMPTZ DEFAULT NOW () NOT NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    PRIMARY KEY (customer_id, book_id, purchase_timestamp),
    FOREIGN KEY (customer_id) REFERENCES PUBLIC.customers (customer_id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (book_id) REFERENCES PUBLIC.books (book_id) ON UPDATE CASCADE -- Since deletion is performed using the delete_book() function the on delete condition is not necessary
  );

ALTER TABLE PUBLIC.purchases ENABLE ROW LEVEL SECURITY;

END;


-- CONSIDER: add a quantity column to the purchases relation?
-- 🔀 v2.1 -> v2.2 : Changed columns which use the MONEY datatype to use DECIMAL(10, 2) instead.
-- To migrate without recreating your database, execute these scripts:
  -- BEGIN;

  -- ALTER TABLE PUBLIC.books
  --     ALTER COLUMN price TYPE DECIMAL(10, 2) USING price::DECIMAL(10, 2);

  -- ALTER TABLE PUBLIC.purchases
  --     ALTER COLUMN amount TYPE DECIMAL(10, 2) USING amount::DECIMAL(10, 2);

  -- END;
