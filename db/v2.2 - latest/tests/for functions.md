> Note: ~~this~~ means that that test case has been verified.


Here are the tests for delete_user and insert_book, rewritten to resemble the format of the update_book tests:

# ✅ delete_user

1. ~~Test 1: Deletion of Different User Types~~
    - Steps:
        - Create users of all types (admin, customer, super admin, and anon user).
        - Attempt to delete each user type using the delete_user function.
    - Expected Behavior:
        - Admin and customer users should be successfully deleted from both `auth.users` and their corresponding tables (`admins` or `customers`).
        - Deletion of super admin users should fail with the error message "User cannot be deleted because they are a super admin."
        - Deletion of `anon` users or those not in `admins` or `customers` should fail with the error message "User does not exist, or is not an admin or a customer."
    
# ✅ insert_book

1. ~~Test 1: Data Insertion with Full Arguments~~
    - **Description:**
        - Verify that the function inserts a book with all provided arguments into the `books` table, correctly setting the timestamp and `is_deleted` value.

    - **Steps:**
        1. Call the function with sample values, using named parameters for clarity:
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

    - **EXPECTED BEHAVIOR:**
        - Successful insertion of the book into the `books` table, verifiable using `SELECT * FROM books;`.
        - `is_deleted` value set to `false` for the inserted book.
        - Uniqueness check for ISBN, raising an error if the ISBN already exists.
        - Error handling for attempts to insert `null` values into non-nullable columns.
        - Error handling for foreign key constraint violations (e.g., attempting to insert a genre that doesn't exist in the `genres` table).
    - **SUBTLE PITFALLS:**
        - Automatic rounding of price to two decimal places.

~~2. Test 2: Handling Optional Arguments~~
    - **Description:**
        - Verify that the function correctly handles optional arguments, such as `timestamp` and `genre`.
    - **Steps:**
        1. Call the function omitting the `timestamp` argument.
        2. Call the function omitting the `genre` argument.
        3. Call the function omitting both `timestamp` and `genre` arguments.

    - **EXPECTED BEHAVIOR:**
        - Insertion of the current timestamp when `timestamp` is omitted.
        - Insertion of `null` for `genre` when it's omitted.
        - Successful insertion in all cases, with appropriate values for optional arguments.

# ✅ update_book
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

# ✅ retrieve_books
**1. Data Retrieval Tests**
- ~~**Test 1: Basic retrieval:**~~
    - Steps: Call the function with no parameters: `SELECT * FROM retrieve_books();`
    - Expected behavior: Returns all non-deleted books from the `books` table.
- ~~**Test 2: Pattern-based retrieval:**~~    
    - Steps: Test with various patterns, e.g., `SELECT * FROM retrieve_books('%adventure%');`
    - Expected behavior: Correctly retrieves books based on the pattern in authors, title, or Amharic title.
- ~~**Test 3: Genre-based retrieval:**~~
    - Steps: Test with different genres, e.g., `SELECT * FROM retrieve_books(NULL, 'fantasy');`
    - Expected behavior: Filters books by the specified genre.
- ~~**Test 4: Combined retrieval:**~~
    - Steps: Test with both pattern and genre parameters, e.g., `SELECT * FROM retrieve_books('%title%', 'Thriller');`
    - Expected behavior: Combines filtering conditions accurately.

**2. Parameter Handling Tests**
- ~~**Test 5: Null parameters:**~~    
    - Steps: Call the function with both parameters as null: `SELECT * FROM retrieve_books(NULL, NULL);`
    - Expected behavior: Returns all non-deleted books.
- ~~**Test 6: Single parameter tests:**~~
    - Steps: Test with one parameter 
    - Expected behavior: Correctly filters books based on the provided pattern.

**3. Edge Case Tests**
- ~~**Test 7: Invalid patterns:**~~
    - Steps: Test with invalid patterns (e.g., empty strings, non-matching patterns).
    - Expected behavior: Returns empty table

**4. Error Handling Tests**
- ~~**Test 8: Invalid parameters:**~~
    - Steps: Test with invalid parameter types or values.
    - Expected behavior: Raises function does not exist error.

# buy_books
**1. Valid Purchase Tests** 
    - **Test 1: Successful purchase** 
        - Steps: 
            1. Insert a book with a quantity of `x`. 
            2. Insert a customer. 
            3. Call `buy_books(customer_id, book_id, x)`. 
        
        - Expected behavior: 
            1. Function returns TRUE. 
            2. Quantity in the `books` table is updated to `quantity - x`. 
            3. A new record is inserted into the `purchases` table with the correct data. 

    - **Test 2: Multiple book purchase** 
        - Steps: 
            1. Insert a book with a quantity of 10. 
            2. Insert a customer. 
            3. Call `buy_books(customer_id, book_id, 4)` twice. 
            
        - Expected behavior: 
            1. Function returns TRUE twice. 
            2. Quantity in the `books` table is updated to 2. 
            3. Two records are inserted into the `purchases` table with the correct data.

**2. Input Validation Tests** 
    - **Test 3: Invalid quantity (less than 1)** 
        - Steps: 
            1. Insert a book. 
            2. Insert a customer. 
            3. Call `buy_books(customer_id, book_id, 0)`. 
        
        - Expected behavior: 
            1. Function raises the exception "Invalid quantity. Quantity of books inserted is less than 1 or NULL." 

    - **Test 4: NULL quantity** 
        - Steps: 
            1. Insert a book. 
            2. Insert a customer. 
            3. Call `buy_books(customer_id, book_id, NULL)`. 
                
        - Expected behavior: 
            1. Function raises the exception "Invalid quantity. Quantity of books inserted is less than 1 or NULL." 
    
    - **Test 5: Invalid customer_id** 
        - Steps: 
            1. Insert a book. 
            2. Call `buy_books(nonexistent_customer_id, book_id, 2)`. 
            
        - Expected behavior: 
            1. Function raises an appropriate exception indicating an invalid customer ID. 
    
    - **Test 6: Invalid book_id** 
        - Steps: 
            1. Insert a customer. 
            2. Call `buy_books(customer_id, nonexistent_book_id, 2)`. 
            
        - Expected behavior: 
            1. Function raises an appropriate exception indicating an invalid book ID.

**3. Availability Checks** 
    - **Test 7: Insufficient quantity** 
        - Steps: 
            1. Insert a book with a quantity of 1. 
            2. Insert a customer. 
            3. Call `buy_books(customer_id, book_id, 2)`. 
        
        - Expected behavior: 
            1. Function raises the exception "Quantity specified exceeds quantity available."

**4. Edge Case Tests** 
    - **Test 8: Zero quantity** 
        - Steps: 
            1. Insert a book. 
            2. Insert a customer. 
            3. Call `buy_books(customer_id, book_id, 0)`. 
        
        - Expected behavior: 
            1. Function does not update the `books` table or insert a record in the `purchases` table. 
            
    - **Test 9: Attempting to purchase the last available book** 
        - Steps: 
            1. Insert a book with a quantity of 1. 
            2. Insert a customer. 
            3. Call `buy_books(customer_id, book_id, 1)`. 
        
        - Expected behavior: 
            1. Function returns TRUE. 
            2. Quantity in the `books` table is updated to 0. 
            3. A new record is inserted into the `purchases` table with the correct data.

**5. Error Handling Tests** 
    - **Test 10: Database errors (e.g., constraint violations)** 
        - Steps: 
            1. Simulate a constraint violation (e.g., a unique constraint on the customer_id and book_id in the purchases table). 
            2. Call `buy_books(customer_id, book_id, 2)`. 
        
        - Expected behavior: 1. Function raises an appropriate exception indicating the constraint violation.


# Advanced tests - not done for now but worth considering in the future 
## delete_user
  - Multiple Attempts: Simulate scenarios where multiple processes or users try to delete the same user concurrently to test for race conditions or unexpected behavior.
  - Data Integrity: Check if any constraints or triggers might prevent deletion under certain conditions.

## For all
  -  Database errors:
        Steps: Simulate database errors (e.g., connection issues, table access problems).
        Expected behavior: Tests error handling and transaction rollback.
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
## retrieve_books 
