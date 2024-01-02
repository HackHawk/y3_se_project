-- ================================================================================================================ 
-- Create customer or admin (user profiles) trigger 
-- ================================================================================================================
-- On the customer frontend  you need to do something like 
-- const { data, error } = await supabase.auth.signUp({
--     email: 'customer@example.com',
--     password: '12345678',
--     options: {
--         data: {
--             first_name: "Arataka",
--             last_name: "Reigen",
--             frontend: "CUSTOMER" // This part is important.
--         }
--     }
-- });

CREATE OR REPLACE FUNCTION create_user_profile() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  BEGIN
    IF (NEW.raw_user_meta_data ->> 'frontend')::TEXT = 'CUSTOMER' THEN
      -- Create customer profile
      INSERT INTO public.customers(customer_id, last_name, first_name)
      VALUES (
        NEW.id,
        (NEW.raw_user_meta_data ->> 'last_name')::TEXT,
        (NEW.raw_user_meta_data ->> 'first_name')::TEXT
      );
    ELSIF (NEW.raw_user_meta_data ->> 'frontend')::TEXT = 'ADMIN' THEN
      -- Create admin profile
      INSERT INTO public.admins(admin_id, last_name, first_name)
      VALUES (
        NEW.id,
        (NEW.raw_user_meta_data ->> 'last_name')::TEXT,
        (NEW.raw_user_meta_data ->> 'first_name')::TEXT
      );
    ELSE
      -- Handle unexpected frontend values (optional)
      RAISE EXCEPTION 'New user must either be an admin or a customer. Invalid frontend value: %', (NEW.raw_user_meta_data ->> 'frontend')::TEXT;
    END IF;

    -- Delete JSON data from auth.users.raw_user_metadata (after profile creation)
    UPDATE auth.users
    SET raw_user_meta_data = NULL
    WHERE auth.users.id = NEW.id;

    RETURN NEW;
  END;
END;
$$;

CREATE OR REPLACE TRIGGER create_user_profile_trigger
BEFORE INSERT ON auth.users FOR EACH ROW
EXECUTE FUNCTION create_user_profile();
