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

CREATE POLICY "Super admins can C/R/U/D admin data" ON "public"."admins" AS PERMISSIVE FOR 
ALL 
  TO authenticated USING (
    auth.uid () IN (
      SELECT
        sp_admin_id
      FROM
        sp_admin
    )
  );

END;
