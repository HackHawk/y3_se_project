-- ===============================================================================================================
-- Database schema v1.1
-- ===============================================================================================================

BEGIN;

CREATE TABLE IF NOT EXISTS public.books (
  book_id BIGSERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  amhr_title VARCHAR, -- NOT NULL,
  isbn BIGINT,
  authors VARCHAR NOT NULL,
  synopsis VARCHAR,
  amhr_synopsis VARCHAR,
  publisher VARCHAR,
  publication_date DATE,
  is_hardcover BOOLEAN,
  genre VARCHAR,
  language VARCHAR NOT NULL,
  average_rating DOUBLE PRECISION NOT NULL DEFAULT 0,
  quantity BIGINT NOT NULL DEFAULT 0,
  price MONEY NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS public.customer (
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL UNIQUE,
  customer_uuid UUID NOT NULL PRIMARY KEY,
  FOREIGN KEY (customer_uuid) REFERENCES "auth"."users"("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS public.admins (
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  phone_number VARCHAR NOT NULL UNIQUE,
  admin_uuid UUID NOT NULL PRIMARY KEY,
  FOREIGN KEY (admin_uuid) REFERENCES "auth"."users"("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS public.purchases (
  book_id BIGINT NOT NULL, 
  customer_uuid UUID NOT NULL,
  purchase_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  PRIMARY KEY (book_id, customer_uuid, purchase_timestamp),
  FOREIGN KEY (book_id) REFERENCES public.books(book_id),
  FOREIGN KEY (customer_uuid) REFERENCES public.customer(customer_uuid)
);
END;

-- ========================= Database schema v0.1 ==================================================

BEGIN;
CREATE TABLE IF NOT EXISTS public.book
(
    title character varying NOT NULL,
    isbn bigint NOT NULL,
    authors character varying NOT NULL,
    synopsis character varying,
    publisher character varying,
    publication_date date,
    print_version boolean NOT NULL,
    genre character varying NOT NULL,
    language character varying NOT NULL,
    "average rating" double precision NOT NULL DEFAULT 0,
    quantity bigint NOT NULL DEFAULT 0,
    price double precision NOT NULL DEFAULT 0,
    PRIMARY KEY (isbn)
);
CREATE TABLE IF NOT EXISTS public.customer
(
    email character varying,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    phone_number character varying NOT NULL,
    PRIMARY KEY (email),
    UNIQUE (phone_number)
);
CREATE TABLE IF NOT EXISTS public.employee
(
    "employeeID" bigserial,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    phone_number bigint NOT NULL,
    email character varying NOT NULL,
    PRIMARY KEY ("employeeID"),
    UNIQUE (phone_number, email)
);
CREATE TABLE IF NOT EXISTS public.purchases
(
    book_isbn bigint NOT NULL,
    customer_email character varying NOT NULL,
    purchase_timestamp timestamp with time zone NOT NULL,
    PRIMARY KEY (book_isbn, customer_email, purchase_timestamp)
);
ALTER TABLE IF EXISTS public.purchases
    ADD FOREIGN KEY (book_isbn)
    REFERENCES public.book (isbn) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
ALTER TABLE IF EXISTS public.purchases
    ADD FOREIGN KEY (customer_email)
    REFERENCES public.customer (email) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
END;

