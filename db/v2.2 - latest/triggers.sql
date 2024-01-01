-- ================================================================================================================ 
-- Create customer trigger 
-- ================================================================================================================

-- On the customer frontend  you need to do something like 
-- supabase.auth.signUp({
--     email: "example@example.com"
--     password: "password"
--     data: {
--         first_name: "Arataka",
--         last_name: "Reigen",
--         frontend: "customer"
--     }
-- });

CREATE OR REPLACE FUNCTION create_customer()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  BEGIN
    -- Extract the fields from the raw_user_metadata JSON in auth.users
    -- and insert into customers
    INSERT INTO customers(customer_id, last_name, first_name)
    SELECT NEW.id,
          (SELECT (raw_user_meta_data ->> 'last_name')
            FROM auth.users
            WHERE user_id = NEW.id)::TEXT,
          (SELECT (raw_user_meta_data ->> 'first_name')
            FROM auth.users
            WHERE user_id = NEW.id)::TEXT;
    
    -- Delete the JSON data from auth.users.raw_user_metadata
    UPDATE auth.users
    SET raw_user_meta_data = NULL
    WHERE auth.users.id = NEW.id;
    
    RETURN NEW;
  END;
END;
$$;

CREATE OR REPLACE TRIGGER create_customer_trigger
BEFORE INSERT ON auth.users
FOR EACH ROW
WHEN ((NEW.raw_user_meta_data ->> 'frontend')::TEXT = 'customer') -- checks that the user is signing in from the client frontend before 
EXECUTE FUNCTION create_customer();

-- ================================================================================================================ 
-- TODO Ratings recalculation trigger - might be better to do this client side.
-- ================================================================================================================
