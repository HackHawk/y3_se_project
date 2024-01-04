# Advanced tests - not done for now but worth considering before deployment 
- transaction behavior
- concurrency behavior and race conditions
    - multiple concurrent purchases
- Check for potential SQL injection vulnerabilities.

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
## buy_books
- Do tests that test concurrent access.
