-- For Database v1.1

INSERT INTO public.books (title, amhr_title, isbn, authors, synopsis, amhr_synopsis, publisher, publication_date, is_hardcover, genre, language, average_rating, quantity, price)
VALUES ('Pride and Prejudice', 'ትዕቢት እና ክርክር', 9780140435015, 'Jane Austen', 'A witty society novel about Elizabeth Bennet''s marriage prospects in early 19th-century England.', 'እንግሊዝ ውስጥ 19ኛው ክፍለዘመን አባት ቤኔት ሴቶች እና እድሜ ልጅ ትዕቢት እና ክርክር.', 'Penguin Classics', '1813-01-28', true, 'Classic Literature', 'English', 4.15, 15, 12.99);

INSERT INTO public.books (title, amhr_title, isbn, authors, synopsis, amhr_synopsis, publisher, publication_date, is_hardcover, genre, language, average_rating, quantity, price)
VALUES ('Project Hail Mary', 'ፕሮጀክት ድን ማርያ', 9780525622908, 'Andy Weir', 'An amnesiac astronaut wakes up on a spaceship headed for a distant star system with no memory of his mission.', 'የጠፋ አስታወስ አንድ የጠፈር አው አው የማይታወቅ ተልእኮ ጋር ወደ ርቀቅ ኮከብ ስርአት በሚያመራ አው ላይ ይነቃቃል.', 'Crown Books', '2021-05-04', false, 'Sci-Fi Thriller', 'English', 4.27, 30, 14.99);

INSERT INTO public.books (title, amhr_title, isbn, authors, synopsis, amhr_synopsis, publisher, publication_date, is_hardcover, genre, language, average_rating, quantity, price)
VALUES ('Goodnight Moon', 'ጨለማ ምሽት ጨረታ', 9780399228470, 'Margaret Wise Brown', 'A young bunny says goodnight to everything in its room before falling asleep.', 'አንድ ትንሽ ድመና አንድ አንድ ክፍል ውስጥ ያለ ሁሉም ነገርን ተባርኮ ከተኝታ በፊት ይቀመጣል.', 'HarperCollins', '1947-04-28', true, 'Children''s Literature', 'English', 4.82, 20, 9.99);

INSERT INTO public.books (title, amhr_title, isbn, authors, synopsis, amhr_synopsis, publisher, publication_date, is_hardcover, genre, language, average_rating, quantity, price)
VALUES ('The Pillars of the Earth', 'የምድር አምዶች', 9780345476765, 'Ken Follett', 'A sweeping saga about the building of a cathedral in medieval England.', 'የመካከለኛው ዘመን እንግሊዝ ውስጥ አንድ ካቴድራል ህንፃ ስለ ታሪክ አይነት ጽሁፍ.', 'Penguin Random House', '1989-03-09', true, 'Historical Fiction', 'English', 4.21, 10, 18.99);

INSERT INTO public.books (title, amhr_title, authors, genre, language, price, publication_date)
VALUES ('The Hobbit', 'የሆቢት', 'J.R.R. Tolkien', 'Fantasy', 'English', 11.25, '1937-09-21');

INSERT INTO public.books (title, amhr_title, authors, genre, language, price, publication_date)
VALUES ('Sapiens: A Brief History of Humankind', 'Sapiens', 'Yuval Noah Harari', 'Non-Fiction', 'English', 18.99, '2014-02-10');

INSERT INTO public.books (title, amhr_title, authors, genre, language, price, publication_date)
VALUES ('The Da Vinci Code', 'የዳቪንቺ ኮድ', 'Dan Brown', 'Mystery', 'English', 14.75, '2003-03-18');

INSERT INTO public.books (title, amhr_title, authors, genre, language, price, publication_date)
VALUES ('Dune', 'Dune', 'Frank Herbert', 'Science Fiction', 'English', 15.50, '1965-06-01');

INSERT INTO public.books (title, amhr_title, authors, genre, language, price, publication_date)
VALUES ('The Great Gatsby', 'ታላቅ ጋatsby', 'F. Scott Fitzgerald', 'Fiction', 'English', 12.99, '1925-04-10');


-- -- For Database v1.0
-- -- Delete all data from the purchases table
-- DELETE FROM public.purchases;

-- -- Delete all data from the book table
-- DELETE FROM public.book;

-- -- Delete all data from the customer table
-- DELETE FROM public.customer;

-- -- Delete all data from the employee table
-- DELETE FROM public.employee;

-- -- Insert data into the book table
-- INSERT INTO public.book (title, isbn, authors, synopsis, publisher, publication_date, print_version, genre, language, "average rating", quantity, price)
-- VALUES 
--     ('Book Title 1', 1234567890123, 'Author 1', 'Synopsis 1', 'Publisher 1', '2023-01-01', true, 'Genre 1', 'Language 1', 4.5, 100, 29.99),
--     ('Book Title 2', 9876543210987, 'Author 2', 'Synopsis 2', 'Publisher 2', '2023-02-01', false, 'Genre 2', 'Language 2', 3.8, 50, 19.99),
--     ('Book Title 3', 1111222233334, 'Author 3', 'Synopsis 3', 'Publisher 3', '2023-03-01', true, 'Genre 3', 'Language 3', 4.0, 80, 24.99),
--     ('Book Title 4', 5555666677778, 'Author 4', 'Synopsis 4', 'Publisher 4', '2023-04-01', false, 'Genre 4', 'Language 4', 4.2, 120, 32.99),
-- 	('The Lord of the Rings', 9780345339711, 'J. R. R. Tolkien', 'An epic fantasy trilogy about hobbits on a quest to destroy an evil ring', 'HarperCollins', '1954-07-29', true, 'Fantasy', 'English', 4.9, 10, 15.99),
-- 	('Pride and Prejudice', 9780143439122, 'Jane Austen', 'A witty and insightful novel about love and social class in 19th-century England', 'Penguin Classics', '1813-01-28', true, 'Romance', 'English', 4.8, 5, 8.99),
-- 	('To Kill a Mockingbird', 9780446310789, 'Harper Lee', 'A powerful coming-of-age story about racial injustice in the American South', 'Harper Perennial', '1960-07-11', true, 'Fiction', 'English', 4.8, 7, 9.99),
-- 	('The Great Gatsby', 9780743273565, 'F. Scott Fitzgerald', 'A tragic story of love and loss in the Jazz Age', 'Scribner', '1925-04-10', true, 'Fiction', 'English', 4.7, 8, 11.99),
-- 	('1984', 9780451524935, 'George Orwell', 'A dystopian novel about a totalitarian government', 'Penguin Classics', '1949-06-8', true, 'Science Fiction', 'English', 4.6, 6, 7.99),
-- 	('The Catcher in the Rye', 9780312552703, 'J. D. Salinger', 'A coming-of-age story about a cynical teenager', 'Little, Brown and Company', '1951-07-16', true, 'Fiction', 'English', 4.5, 4, 6.99),
-- 	('Harry Potter and the Philosophers Stone', 9780747532785, 'J. K. Rowling', 'The first book in the Harry Potter series, about a young wizard who discovers his magical abilities', 'Bloomsbury Publishing', '1997-06-26', true, 'Fantasy', 'English', 4.9, 15, 14.99),
-- 	('The Hunger Games', 9780439023481, 'Suzanne Collins', 'A dystopian novel about a teenage girl who volunteers to take her younger sisters place in a deadly competition', 'Scholastic Press', '2008-09-14', true, 'Young Adult', 'English', 4.6, 9, 12.99),
-- 	('The Fault in Our Stars', 9780143124892, 'John Green', 'A moving story of two teenagers with cancer who fall in love', 'Dutton Books', '2012-01-10', true, 'Young Adult', 'English', 4.7, 12, 13.99),
-- 	('The Book Thief', 9780375842264, 'Markus Zusak', 'A historical novel about a young girl growing up in Nazi Germany', 'Knopf Books for Young Readers', '2005-09-19', true, 'Historical Fiction', 'English', 4.8, 11, 10.99);

-- -- Insert data into the customer table
-- INSERT INTO public.customer (email, first_name, last_name, phone_number)
-- VALUES 
--     ('customer1@example.com', 'Customer 1', 'Lastname 1', '123456789'),
--     ('customer2@example.com', 'Customer 2', 'Lastname 2', '987654321'),
--     ('customer3@example.com', 'Customer 3', 'Lastname 3', '555666777'),
--     ('customer4@example.com', 'Customer 4', 'Lastname 4', '111222333');
	
-- -- Insert data into the employee table
-- INSERT INTO public.employee (first_name, last_name, phone_number, email)
-- VALUES 
--     ('Employee 1', 'Lastname 1', 111222333, 'employee1@example.com'),
--     ('Employee 2', 'Lastname 2', 444555666, 'employee2@example.com'),
--     ('Employee 3', 'Lastname 3', 777888999, 'employee3@example.com'),
-- 	('Alice', 'Smith', '+3456789012', 'alice@bookstore.com'),
--     ('Bob', 'Johnson', '+5678901234', 'bob@bookstore.com');

-- -- Insert data into the purchases table
-- INSERT INTO public.purchases (book_isbn, customer_email, purchase_timestamp)
-- VALUES 
--     (1234567890123, 'customer1@example.com', '2023-05-01 10:30:00'),
--     (9876543210987, 'customer2@example.com', '2023-05-02 12:45:00'),
--     (1111222233334, 'customer3@example.com', '2023-05-03 14:20:00'),
--     (5555666677778, 'customer4@example.com', '2023-05-04 16:10:00'),
-- 	(1234567890123, 'customer1@example.com', CURRENT_TIMESTAMP),
--     (9876543210987, 'customer2@example.com', CURRENT_TIMESTAMP);

