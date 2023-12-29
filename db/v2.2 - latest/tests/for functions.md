> Note: ~~this~~ means that that test case has been verified.

# ✅ delete_user(UUID)
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
    
# insert_book()
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
        - ~~If `genre` or `cover_page_urls` is not specified it should insert a null value instead~~
        - 
