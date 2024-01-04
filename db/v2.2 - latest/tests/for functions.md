> Note: ~~this~~ means that that test case has been verified to work.


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

**1. Data Retrieval**
    - **Test 1: Basic Retrieval**
        - **Steps:**
            - Call `SELECT * FROM retrieve_books();`
        - **EXPECTED BEHAVIOR:**
            - Returns all non-deleted books from `books` table.
        - **SUBTLE PITFALLS:**
            - Ensure correct handling of soft-deleted books.

    - **Test 2: Pattern-Based Retrieval**
        - **Steps:**
            - Test with various patterns (e.g., `SELECT * FROM retrieve_books('%adventure%');`)
        - **EXPECTED BEHAVIOR:**
             Correctly retrieves books whose attributes authors, title, or Amharic title match the pattern.
        - **SUBTLE PITFALLS:**
            - [ ] Verify case-sensitivity and special character handling.

    - **Test 3: Genre-Based Retrieval**
        - **Steps:**
            - Test with different genres (e.g., `SELECT * FROM retrieve_books(NULL, 'fantasy');`)
        - **EXPECTED BEHAVIOR:**
            - Filters books by the specified genre.
        - **SUBTLE PITFALLS:**
            - Ensure accurate case-sensitive genre matching.

    - **Test 4: Combined Retrieval**
        - **Steps:**
            - Test with both pattern and genre (e.g., `SELECT * FROM retrieve_books('%title%', 'Thriller');`)
        - **EXPECTED BEHAVIOR:**
            - Correctly combines filtering conditions.
        - **SUBTLE PITFALLS:**
            - Verify precedence and logical combination of filters.

**2. Parameter Handling**
    - **Test 5: Null Parameters**
        - **Steps:**
            - Call `SELECT * FROM retrieve_books(NULL, NULL);`
        - **EXPECTED BEHAVIOR:**
            - Returns all non-deleted books.

    - **Test 6: Single Parameter Tests**
        - **Steps:**
            - Test with patterns or genres individually.
        - **EXPECTED BEHAVIOR:**
            - Filters books based on the provided parameter.

**3. Edge Cases**
    - **Test 7: Invalid Patterns**
        - **Steps:**
            - Test with empty strings, non-matching patterns.
        - **EXPECTED BEHAVIOR:**
            - Returns an empty table.

**4. Error Handling**
    - **Test 8: Invalid Parameters**
        - **Steps:**
            - Call with invalid parameter types or values.
        - **EXPECTED BEHAVIOR:**
            - Raises appropriate error messages.
        - **SUBTLE PITFALLS:**
            - [ ] Test for unexpected error types or misleading messages.

# ✅ buy_books

**1. Valid Purchase**
    - **Test 1: Successful Purchase**
        - **Steps:**
            1. Insert a book with quantity `x`.
            2. Insert a customer.
            3. Call `buy_books(customer_id, book_id, x)`.
        - **EXPECTED BEHAVIOR:**
            1. Quantity in `books` table becomes `quantity - x`.
            2. New record in `purchases` table with correct data.

**2. Input Validation**
    - **Test 2: Invalid Quantity (< 1)**
        - **Steps:**
            1. Insert a book.
            2. Insert a customer.
            3. Call `buy_books(customer_id, book_id, 0)` or `buy_books(customer_id, book_id, NULL)`.
        - **EXPECTED BEHAVIOR:**
            1. Function raises the exception "Invalid quantity. Quantity of books inserted is less than 1 or NULL."            

    - **Test 3: Invalid Customer ID**
        - **Steps:**
            1. Insert a book.
            2. Call `buy_books(nonexistent_customer_id, book_id, 2)`.
        - **EXPECTED BEHAVIOR:**
            1. Exception: Violation of foreign key constraint on `purchases` table.
        - **SUBTLE PITFALLS:**
            - Ensure meaningful error messages for debugging.

    - **Test 4: Invalid Book ID**
        - **Steps:**
            1. Insert a customer.
            2. Call `buy_books(customer_id, nonexistent_book_id, 2)`.
        - **EXPECTED BEHAVIOR:**
            1. Clear exception indicating invalid book ID.
        - **POSSIBLE IMPROVEMENT:**
            - [ ] Verify error message clarity for understanding the issue.

**3. Availability Checks**
    - **Test 5: Insufficient Quantity**
        - **Steps:**
            1. Insert a book with quantity 1.
            2. Insert a customer.
            3. Call `buy_books(customer_id, book_id, 2)`.
        - **EXPECTED BEHAVIOR:**
            1. Exception: "Book quantity specified exceeds quantity available."

**4. Edge Cases**
    - **Test 6: Purchasing Last Book**
        - **Steps:**
            1. Insert a book with quantity 1.
            2. Insert a customer.
            3. Call `buy_books(customer_id, book_id, 1)`.
        - **EXPECTED BEHAVIOR:**
            1. Quantity in `books` table becomes 0.
            2. New record in `purchases` table with correct data.


# ❌ ~~delete_book~~ the tests will be similar but we won't have a delete book sql function since there isn't a way to delete the coverpages as from sql.

**1. Functionality Tests**

- **Test 1: Successful Book Deletion:**
    - Steps:
      1. Insert a book with cover pages into the database.
      2. Call `SELECT delete_book(book_id)`, passing the inserted book's ID.
    - Expected behavior:
      1. Function returns `TRUE`.
      2. Book record is either softly deleted (with `is_deleted` set to `TRUE`) or completely removed from the `books` table, depending on purchase history.
      3. Related records in `customer_reviews` and `prioritized_books` tables are deleted.
      4. Cover pages are successfully removed from storage.
      5. `cover_page_urls` column in the `books` table is set to `NULL`.

- **Test 2: Non-Existent Book:**
    - Steps: Call `SELECT delete_book(invalid_book_id)` with a book ID that doesn't exist.
    - Expected behavior: Function returns `FALSE` or raises an appropriate exception. 

**2. Edge Case Handling**

- **Test 3: Book with Missing Cover Pages:**
    - Steps: Insert a book without any cover pages and try to delete it.
    - Expected behavior: Function executes successfully without attempting storage deletion.

- **Test 4: Book with Multiple Cover Pages:**
    - Steps: Insert a book with multiple cover page URLs and delete it.
    - Expected behavior: All cover pages are successfully removed from storage.

- **Test 5: Book with Purchase History (Soft Delete):**
    - Steps: Insert a book, create a corresponding purchase record, and delete the book.
    - Expected behavior: Book is softly deleted (fields cleared, `is_deleted` set to `TRUE`), not hard-deleted.

**3. Error Handling**

- **Test 6: Storage Deletion Failure:**
    - Steps: Simulate a storage deletion failure (e.g., by removing permissions or causing a network error).
    - Expected behavior: Function raises an exception indicating the storage deletion issue.

- **Test 7: Database Constraint Violation:**
    - Steps: Create a foreign key constraint preventing book deletion with existing reviews. Try to delete a book with reviews.
    - Expected behavior: Function raises an exception indicating the constraint violation.

**4. Additional Considerations:**

- **Test 8: User Permissions:**
    - If applicable, test authorization checks to ensure only authorized users can delete books.
- **Test 9: Transaction Behavior:**
    - If using transactions, test their behavior (e.g., rollback on errors) in the context of book deletion.


