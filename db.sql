-- ===============================================================================================================
-- Database schema v2.0
-- ===============================================================================================================
-- Contractions - C: Create, R: Read, U:Update, D:Delete
-- Relations  ====================================================================================================
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
    price MONEY,
    is_hardcover BOOLEAN,
    average_rating DECIMAL(2, 1) DEFAULT 0,
    quantity BIGINT,
    addition_tmstmp TIMESTAMPTZ DEFAULT NOW () NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    cover_page_urls TEXT [],
    FOREIGN KEY (genre) REFERENCES PUBLIC.genres (genre_name)
  );

ALTER TABLE PUBLIC.books ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  IF NOT EXISTS PUBLIC.prioritized_books (
    book_id BIGINT PRIMARY KEY,
    FOREIGN KEY (book_id) REFERENCES PUBLIC.books (book_id)
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
    FOREIGN KEY (customer_id) REFERENCES PUBLIC.customers (customer_id),
    FOREIGN KEY (book_id) REFERENCES PUBLIC.books (book_id)
  );

ALTER TABLE PUBLIC.customer_reviews ENABLE ROW LEVEL SECURITY;

CREATE TABLE
  IF NOT EXISTS PUBLIC.purchases (
    customer_id UUID NOT NULL,
    book_id BIGINT NOT NULL,
    purchase_timestamp TIMESTAMPTZ DEFAULT NOW () NOT NULL,
    amount MONEY NOT NULL,
    PRIMARY KEY (customer_id, book_id, purchase_timestamp),
    FOREIGN KEY (customer_id) REFERENCES PUBLIC.customers (customer_id) ON DELETE SET NULL,
    FOREIGN KEY (book_id) REFERENCES PUBLIC.books (book_id)
  );

ALTER TABLE PUBLIC.purchases ENABLE ROW LEVEL SECURITY;

END;

-- Policies ===============================================================================================================
BEGIN;

-- =============== For books relation ====================================================================

CREATE POLICY "Everyone can Read book catalog" ON "public"."books" AS PERMISSIVE FOR
SELECT
  TO PUBLIC USING (TRUE);

CREATE POLICY "Admins and super admins can C/R/U/D book catalog" ON "public"."books" AS PERMISSIVE FOR 
ALL 
  TO authenticated USING (
    auth.uid () IN (
      SELECT
        admin_id
      FROM
        public.admins
      UNION
      SELECT
        sp_admin_id
      FROM
        public.sp_admin
    )
  );

-- =============== For customer_reviews relation ========================================================

CREATE POLICY "Everyone can Read customer reviews" ON "public"."customer_reviews" AS PERMISSIVE FOR
SELECT
  TO PUBLIC USING (TRUE);

CREATE POLICY "Customers can Create their own reviews" ON "public"."customer_reviews" AS PERMISSIVE FOR
INSERT
  TO authenticated
WITH
  CHECK (
    customer_reviews.customer_id = auth.uid ()
    AND auth.uid () IN (
      SELECT
        customer_id
      FROM
        public.customers
    )
  );

CREATE POLICY "Customers can Update their own reviews" ON "public"."customer_reviews" AS PERMISSIVE FOR
UPDATE TO authenticated USING (auth.uid () = customer_reviews.customer_id);

CREATE POLICY "Customers can Delete their own reviews" ON "public"."customer_reviews" AS PERMISSIVE FOR
DELETE TO authenticated USING (auth.uid () = customer_reviews.customer_id);

CREATE POLICY "Admins can Delete customer reviews" ON "public"."customer_reviews" AS PERMISSIVE FOR
DELETE TO authenticated USING (
  auth.uid () IN (
    SELECT
      admin_id
    FROM
      public.admins
    UNION
    SELECT
      sp_admin_id
    FROM
      public.sp_admin
  )
);

-- =============== For customers relation ============================================================

CREATE POLICY "Admins and super admins can Read customer data" ON "public"."customers" AS PERMISSIVE FOR
SELECT
  TO authenticated USING (
    auth.uid () IN (
      SELECT
        admin_id
      FROM
        public.admins
      UNION
      SELECT
        sp_admin_id
      FROM
        public.sp_admin
    )
  );

CREATE POLICY "Admins and super admins can Delete customer data" ON "public"."customers" AS PERMISSIVE FOR
DELETE TO authenticated USING (
  auth.uid () IN (
    SELECT
      admin_id
    FROM
      public.admins
    UNION
    SELECT
      sp_admin_id
    FROM
      public.sp_admin
  )
);

CREATE POLICY "Customers can Read their own metadata" ON "public"."customers" AS PERMISSIVE FOR
SELECT
  TO authenticated USING (auth.uid () = customers.customer_id);

CREATE POLICY "Customers can Update their own metadata" ON "public"."customers" AS PERMISSIVE FOR
UPDATE TO authenticated USING (auth.uid () = customers.customer_id);

CREATE POLICY "Customers can Delete their own metadata" ON "public"."customers" AS PERMISSIVE FOR
DELETE TO authenticated USING (auth.uid () = customers.customer_id);

-- =============== For purchases relation ============================================================

CREATE POLICY "Customers can Create their own purchases" ON "public"."purchases" AS PERMISSIVE FOR
INSERT
  TO authenticated
WITH
  CHECK (auth.uid () = purchases.customer_id);

CREATE POLICY "Customers can Read their own purchases" ON "public"."purchases" AS PERMISSIVE FOR
SELECT
  TO authenticated USING (auth.uid () = purchases.customer_id);

CREATE POLICY "Admins and super admins can Read purchases" ON "public"."purchases" AS PERMISSIVE FOR
SELECT
  TO authenticated USING (
    auth.uid () IN (
      SELECT
        admin_id
      FROM
        "public"."admins"
      UNION
      SELECT
        sp_admin_id
      FROM
        "public"."sp_admin"
    )
  );

-- =============== For prioritized_books relation ====================================================

CREATE POLICY "Everyone can Read prioritized books" ON "public"."prioritized_books" AS PERMISSIVE FOR
SELECT
  TO PUBLIC USING (TRUE);

CREATE POLICY "Admins and super admins can Create prioritized books" ON "public"."prioritized_books" AS PERMISSIVE FOR
INSERT
  TO authenticated
WITH
  CHECK (
    auth.uid () IN (
      SELECT
        admin_id
      FROM
        "public"."admins"
      UNION
      SELECT
        sp_admin_id
      FROM
        "public"."sp_admin"
    )
  );

CREATE POLICY "Admins and super admins can Update prioritized books" ON "public"."prioritized_books" AS PERMISSIVE FOR
UPDATE TO authenticated USING (
  auth.uid () IN (
    SELECT
      admin_id
    FROM
      "public"."admins"
    UNION
    SELECT
      sp_admin_id
    FROM
      "public"."sp_admin"
  )
);

CREATE POLICY "Admins and super admins can Delete prioritized books" ON "public"."prioritized_books" AS PERMISSIVE FOR
DELETE TO authenticated USING (
  auth.uid () IN (
    SELECT
      admin_id
    FROM
      "public"."admins"
    UNION
    SELECT
      sp_admin_id
    FROM
      "public"."sp_admin"
  )
);

-- =============== For genres relation ==========================================================

CREATE POLICY "Everyone can Read genres" ON "public"."genres" AS PERMISSIVE FOR
SELECT
  TO PUBLIC USING (true);

CREATE POLICY "Admins and super admins can Create genres" ON "public"."genres" AS PERMISSIVE FOR
INSERT
  TO authenticated
WITH
  CHECK (
    auth.uid () IN (
      SELECT
        admin_id
      FROM
        "public"."admins"
      UNION
      SELECT
        sp_admin_id
      FROM
        "public"."sp_admin"
    )
  );

CREATE POLICY "Admins and super admins can Update genres" ON "public"."genres" AS PERMISSIVE FOR
UPDATE TO authenticated USING (
  auth.uid () IN (
    SELECT
      admin_id
    FROM
      "public"."admins"
    UNION
    SELECT
      sp_admin_id
    FROM
      "public"."sp_admin"
  )
);

CREATE POLICY "Admins and super admins can Delete genres" ON "public"."genres" AS PERMISSIVE FOR
DELETE TO authenticated USING (
  auth.uid () IN (
    SELECT
      admin_id
    FROM
      "public"."admins"
    UNION
    SELECT
      sp_admin_id
    FROM
      "public"."sp_admin"
  )
);

-- =============== For sp_admin relation ===========================================

CREATE POLICY "Super admins can Read their own data." ON "public"."sp_admin" AS PERMISSIVE FOR
SELECT
  TO authenticated USING (auth.uid () = sp_admin.sp_admin_id);

CREATE POLICY "Super admins can Update their own data" ON "public"."sp_admin" AS PERMISSIVE FOR
UPDATE TO authenticated USING (auth.uid () = sp_admin.sp_admin_id);

-- =============== For admins relation =============================================

CREATE POLICY "Admins can Read their own data" ON "public"."admins" AS PERMISSIVE FOR
SELECT
  TO authenticated USING (auth.uid () = admins.admin_id);

CREATE POLICY "Admins can Update their own data" ON "public"."admins" AS PERMISSIVE FOR
UPDATE TO authenticated USING (auth.uid () = admins.admin_id);

CREATE POLICY "Admins can Delete their own data" ON "public"."admins" AS PERMISSIVE FOR
DELETE TO authenticated USING (auth.uid () = admins.admin_id);

CREATE POLICY "Super admins can C/R/U/D admin data" ON "public"."admins" AS PERMISSIVE FOR ALL TO authenticated USING (
  auth.uid () IN (
    SELECT
      sp_admin_id
    FROM
      sp_admin
  )
);

END;

-- ===============================================================================================================
-- Database schema v1.1
-- ===============================================================================================================
-- BEGIN;
-- CREATE TABLE IF NOT EXISTS public.books (
--   book_id BIGSERIAL PRIMARY KEY,
--   title VARCHAR NOT NULL,
--   amhr_title VARCHAR, -- NOT NULL,
--   isbn BIGINT,
--   authors VARCHAR NOT NULL,
--   synopsis VARCHAR,
--   amhr_synopsis VARCHAR,
--   publisher VARCHAR,
--   publication_date DATE,
--   is_hardcover BOOLEAN,
--   genre VARCHAR,
--   language VARCHAR NOT NULL,
--   average_rating DOUBLE PRECISION NOT NULL DEFAULT 0,
--   quantity BIGINT NOT NULL DEFAULT 0,
--   price MONEY NOT NULL DEFAULT 0
-- );
-- CREATE TABLE IF NOT EXISTS public.customer (
--   first_name VARCHAR NOT NULL,
--   last_name VARCHAR NOT NULL,
--   phone_number VARCHAR NOT NULL UNIQUE,
--   customer_uuid UUID NOT NULL PRIMARY KEY,
--   FOREIGN KEY (customer_uuid) REFERENCES "auth"."users"("id") ON DELETE CASCADE
-- );
-- CREATE TABLE IF NOT EXISTS public.admins (
--   first_name VARCHAR NOT NULL,
--   last_name VARCHAR NOT NULL,
--   phone_number VARCHAR NOT NULL UNIQUE,
--   admin_uuid UUID NOT NULL PRIMARY KEY,
--   FOREIGN KEY (admin_uuid) REFERENCES "auth"."users"("id") ON DELETE CASCADE
-- );
-- CREATE TABLE IF NOT EXISTS public.purchases (
--   book_id BIGINT NOT NULL, 
--   customer_uuid UUID NOT NULL,
--   purchase_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
--   PRIMARY KEY (book_id, customer_uuid, purchase_timestamp),
--   FOREIGN KEY (book_id) REFERENCES public.books(book_id),
--   FOREIGN KEY (customer_uuid) REFERENCES public.customer(customer_uuid)
-- );
-- END;
-- -- ========================= Database schema v0.1 ==================================================
-- BEGIN;
-- CREATE TABLE IF NOT EXISTS public.book
-- (
--     title character varying NOT NULL,
--     isbn bigint NOT NULL,
--     authors character varying NOT NULL,
--     synopsis character varying,
--     publisher character varying,
--     publication_date date,
--     print_version boolean NOT NULL,
--     genre character varying NOT NULL,
--     language character varying NOT NULL,
--     "average rating" double precision NOT NULL DEFAULT 0,
--     quantity bigint NOT NULL DEFAULT 0,
--     price double precision NOT NULL DEFAULT 0,
--     PRIMARY KEY (isbn)
-- );
-- CREATE TABLE IF NOT EXISTS public.customer
-- (
--     email character varying,
--     first_name character varying NOT NULL,
--     last_name character varying NOT NULL,
--     phone_number character varying NOT NULL,
--     PRIMARY KEY (email),
--     UNIQUE (phone_number)
-- );
-- CREATE TABLE IF NOT EXISTS public.employee
-- (
--     "employeeID" bigserial,
--     first_name character varying NOT NULL,
--     last_name character varying NOT NULL,
--     phone_number bigint NOT NULL,
--     email character varying NOT NULL,
--     PRIMARY KEY ("employeeID"),
--     UNIQUE (phone_number, email)
-- );
-- CREATE TABLE IF NOT EXISTS public.purchases
-- (
--     book_isbn bigint NOT NULL,
--     customer_email character varying NOT NULL,
--     purchase_timestamp timestamp with time zone NOT NULL,
--     PRIMARY KEY (book_isbn, customer_email, purchase_timestamp)
-- );
-- ALTER TABLE IF EXISTS public.purchases
--     ADD FOREIGN KEY (book_isbn)
--     REFERENCES public.book (isbn) MATCH SIMPLE
--     ON UPDATE NO ACTION
--     ON DELETE NO ACTION
--     NOT VALID;
-- ALTER TABLE IF EXISTS public.purchases
--     ADD FOREIGN KEY (customer_email)
--     REFERENCES public.customer (email) MATCH SIMPLE
--     ON UPDATE NO ACTION
--     ON DELETE NO ACTION
--     NOT VALID;
-- END;
-- --
