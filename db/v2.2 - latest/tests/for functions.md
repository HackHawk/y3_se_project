> Note: ~~this~~ means that that test case has been verified.

# ✅ delete_user
1. ~~Test 1: Deletes all types of users appropriately~~
    - Steps: 
        - Create users of all types.
            - Use the GUI to create three users
            - Insert each of those users into `admins`, `sp_admin` and `customers`.
        - Try to delete them with this function.
    - **EXPECTED BEHAVIOR**: 
        - ~~The user must be listed as either an admin or a customer for the deletion to proceed. If successful, the user will be deleted from both `auth.users` and the corresponding table (`admins` for admins or `customers` for customers).~~
        - ~~If the user is a super admin then the deletion will fail with the following message: "User cannot be deleted because they are a super admin"~~
        - ~~If the user is an `anon` user or is not in `admins` or `customers` then the deletion will fail with "User does not exist, or is not an admin or a customer"~~
    
# ✅ insert_book
1. ~~Test 1: Inserts the book into `books` with the correct timestamp and `is_deleted` value when all arguments are specified~~
    - Steps:
        - Call the function with sample values like so: (Notice how named parameters were used for easy reading) 
        ```sql
         DO $$ 
            BEGIN 
              PERFORM insert_book(
                isbn := 1234567890124::BIGINT,
                title := 'Sample Title',
                amhr_title := 'Amharic Title',
                authors := 'Author Name',
                synopsis := 'Book Synopsis',
                amhr_synopsis := 'Amharic Synopsis',
                publisher := 'Sample Publisher',
                publication_date := '2023-01-01'::DATE,
                price := 29.99::MONEY,
                is_hardcover := TRUE,
                quantity := 100::BIGINT,
                genre := 'Thriller',
                addition_tmstmp := '2023-01-01T12:00:00Z'::TIMESTAMPTZ,
                cover_page_urls := ARRAY['url1', 'url2']::TEXT[]
              ); 
            END $$;
        ```
    - **EXPECTED BEHAVIOR**:
        - ~~The insertion should be completed successfully use `SELECT * FROM books;` to check .~~
        - ~~The inserted value should have its `is_deleted` set to false.~~
        - ~~If the isbn is not unique then the function should output an error.~~
        - ~~If the timestamp is not specified it should insert the timestamp of insertion~~
        - ~~If `genre` or `cover_page_urls` is not specified it should insert a null~~
        - ~~If you provide null values for Not null columns, it should output an error~~
        - When a genre you try to insert is not in genres table, it should output an error which says that the query violates a FK constraint
    - **SUBTLE PITFALLS**
        - ~~The price is rounded up automatically when precision is more than to two decimal places.~~

# update_book
1. ~~Test 1: Individual field updates. Test that each field can be updated independently, ensuring values are correctly modified in the database.~~
    - Steps:
        - Call the function with random input parameters.  
    - **EXPECTED BEHAVIOR**
        - ~~When a genre you try to update is not in genres table, it should output an error which says that the query violates a FK constraint.~~
        - ~~It should produce an invalid date error when publication date entered is not valid.~~
    - **SUBTLE PITFALLS**
        - ~~The price is rounded up automatically when precision is more than to two decimal places.~~
2. ~~Test 2: Null value handling. Verify that null values provided for update parameters don't overwrite existing book data, as intended by the COALESCE logic.~~
    - Steps:
        - Call the function by ommitting some of its input parameters or setting them to null.
    - **EXPECTED BEHAVIOR AND SUBTLE PITFALLS**
        - ~~When a `null` value is provided by the update parameter, the function will ignore that value. This means that you can't use the function to set the value of an attribute to null.~~
3. ~~Test 3: Error handling. Ensure the correct exception is raised when attempting to update a deleted book.~~
    - Steps: 
        - Purchase a book with `purchase_book()`.
        - Use `delete_book()` to delete a book.
        - Instead of the above two queries you can also use a normal update query to set the `is_deleted` attribute to true.
        - Try to update that same book. 
        - Delete another book (unpurchased book) from `books`
        - Try to update that same book.
    - **EXPECTED BEHAVIOR**
        - The update will fail with the error message "Cannot update book. Either the book has been soft-deleted or it does not exist".

# Advanced tests - not done for now but worth considering in the future 
## delete_user
  - Multiple Attempts: Simulate scenarios where multiple processes or users try to delete the same user concurrently to test for race conditions or unexpected behavior.
  - Data Integrity: Check if any constraints or triggers might prevent deletion under certain conditions.
  - Error Handling: Ensure the function handles unexpected errors gracefully (e.g., database connection issues).

## insert_book
  - **BOUNDARY CONDITIONS**:
    1. Numeric Fields:
        - isbn:
            Maximum positive value (9223372036854775807 for BIGINT)
            Minimum positive value (1)
            Negative values
            Non-numeric values (string, boolean)
            
        - price:
            Maximum positive value for money type in PostgreSQL (9223372036854775807.9999)
            Minimum positive value (0.01)
            Negative values
            Non-numeric values (string, boolean)

        - quantity:
            Maximum positive value for BIGINT (9223372036854775807)
            Minimum positive value (1)
            Negative values
            Non-numeric values (string, boolean)

    2. String Fields:
            title, amhr_title, authors, synopsis, amhr_synopsis, publisher, genre:
            Empty string ("")
            String exceeding any defined character limit (if applicable)
            Special characters or control characters
        
    3. Date Field:
            publication_date:
                Date in the future beyond a reasonable limit (e.g., year 2100)
                Date before the book could have been published (e.g., before Gutenberg press invention)
                Invalid date format
    4. Boolean Field:
        is_hardcover:
            NULL value
            Non-boolean values (string, number)
        
    5. Array Field:
        cover_page_urls:
            Empty array ([])
            Array exceeding a defined maximum length (if applicable)
            Invalid URLs in the array (e.g., missing protocol, non-existent domain)

        Additional Tests:
            Try combinations of boundary values (e.g., maximum isbn with minimum price).
            Test invalid combinations of parameters that shouldn't be allowed (e.g., empty title and amhr_title).
