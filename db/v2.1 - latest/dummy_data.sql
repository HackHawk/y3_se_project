INSERT INTO PUBLIC.genres (genre_name) VALUES ('Historical Fiction');
INSERT INTO PUBLIC.genres (genre_name) VALUES ('Science Fiction');
INSERT INTO PUBLIC.genres (genre_name) VALUES ('Romance');
INSERT INTO PUBLIC.genres (genre_name) VALUES ('Thriller');
INSERT INTO PUBLIC.genres (genre_name) VALUES ('Young Adult');
INSERT INTO PUBLIC.genres (genre_name) VALUES ('Mystery');
INSERT INTO PUBLIC.genres (genre_name) VALUES ('Fantasy');
INSERT INTO PUBLIC.genres (genre_name) VALUES ('Autobiography');
INSERT INTO PUBLIC.genres (genre_name) VALUES ('Non-Fiction');

-- Book 1 - Historical Fiction
INSERT INTO PUBLIC.books (isbn, title, authors, synopsis, genre, publisher, publication_date, price, is_hardcover, quantity)
VALUES (1234567890123, 'The Shadow Queen', 'A.B. Jones', 'Queen Elizabeth I navigates political intrigue and personal challenges...', 'Historical Fiction', 'Bloomsbury Publishing', '2020-10-27', 149.95, TRUE, 5);

-- Book 2 - Science Fiction
INSERT INTO PUBLIC.books (isbn, title, authors, synopsis, genre, publisher, publication_date, price, is_hardcover, quantity)
VALUES (9876543210987, 'Starship Odyssey', 'C.D. Smith', 'A crew embarks on a perilous journey to a distant star system...', 'Science Fiction', 'Orbit Books', '2022-05-17', 229.99, FALSE, 10);

-- Book 3 - Romance
INSERT INTO PUBLIC.books (isbn, title, authors, synopsis, genre, publisher, publication_date, price, is_hardcover, quantity)
VALUES (3345678909876, 'Moonlight Love', 'E.F. Brown', 'Two souls find love amidst a backdrop of forbidden desires...', 'Romance', 'Harlequin Books', '2023-07-14', 99.90, TRUE, 2);

-- Book 11 - Mystery
INSERT INTO PUBLIC.books (isbn, title, authors, synopsis, genre, publisher, publication_date, price, is_hardcover, quantity)
VALUES (2345609871234, 'The Riddle of the Raven', 'G.H. White', 'A detective unravels a cryptic puzzle in a gothic mansion...', 'Mystery', 'Penguin Books', '2021-04-05', 189.00, FALSE, 8);

INSERT INTO PUBLIC.prioritized_books (book_id) VALUES (1);
INSERT INTO PUBLIC.prioritized_books (book_id) VALUES (5);
INSERT INTO PUBLIC.prioritized_books (book_id) VALUES (6);
INSERT INTO PUBLIC.prioritized_books (book_id) VALUES (11);



