
make sure that if the trigger fails to execute, the user signup in auth.users fails.
**# ✅ create_user_profile**

**1. Test 1: Customer Profile Creation**
    - **Steps:**
        - Insert a new user with `raw_user_meta_data` containing `frontend: 'CUSTOMER'` and other relevant data.
    - **EXPECTED BEHAVIOR:**
        - A new row with corresponding data is created in the `customers` table.
        - The `raw_user_meta_data` is cleared in `auth.users` for the inserted user.
    - **SUBTLE PITFALLS:**
        - Ensure data types and constraints align between `auth.users` and `customers`.

**2. Test 2: Admin Profile Creation**
    - **Steps:**
        - Insert a new user with `raw_user_meta_data` containing `frontend: 'ADMIN'` and other relevant data.
    - **EXPECTED BEHAVIOR:**
        - A new row with corresponding data is created in the `admins` table.
        - The `raw_user_meta_data` is cleared in `auth.users` for the inserted user.
    - **SUBTLE PITFALLS:**
        - Ensure data types and constraints align between `auth.users` and `admins`.

**3. Test 3: Unexpected Frontend Value**
    - **Steps:**
        - Insert a new user with `raw_user_meta_data` containing a value other than `CUSTOMER` or `ADMIN`.
    - **EXPECTED BEHAVIOR:**
        - An exception is raised with a clear error message indicating invalid `frontend` value.
    - **SUBTLE PITFALLS:**
        - Verify the exception message's clarity and helpfulness for debugging.

**4. Test 4: Trigger Activation**
    - **Steps:**
        - Manually insert a user into `auth.users` without calling the function directly.
    - **EXPECTED BEHAVIOR:**
        - The trigger automatically calls the function, creating the appropriate profile in either `customers` or `admins` based on `frontend` value.
        - The `raw_user_meta_data` is cleared in `auth.users`.
    - **SUBTLE PITFALLS:**
        - Test for potential performance implications of the trigger, especially under heavy insertion load.
