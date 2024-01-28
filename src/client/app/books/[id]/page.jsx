// TODO: Identify which parts need to be client side. Eg Add to Cart button, and move this parts needing interactivity to their own components
// TODO: No need to export async functions.

import BookCard from '@/components/BookCard/BookCard';
import DisplayBookImages from '@/components/BookDetails/DisplayBookImages';
import AddToCartButton from '@/components/Cart/AddToCartButton';
import supabase from '@/lib/supabaseClient';

// Dynamic paths not available should return 404 page
export const dynamicParams = false;

// Refresh the page after 4 seconds
export const revalidate = 4;

// The following paths are prerendered even before clicked.
export async function generateStaticParams() {
  const { data: books } = await supabase.rpc('retrieve_books');
  return books?.map((book) => ({
    id: (book?.book_id).toString(),
  }));
}

// Function returns book with the ID provided
export async function getBook(id) {
  const { data: book } = await supabase
    .from('books')
    .select()
    .eq('book_id', id);

  //  We return this because the data that is returned is an array
  return book[0];
}

// function returning similar books based on genre, authors, and book_id
export async function getSimilarBooks(book_id, genre, authors) {
  const { data: similarBooks } = await supabase.rpc('retrieve_similar_books', {
    book_id_param: book_id,
    genre_param: genre,
    authors_param: authors,
  });
  return similarBooks;
}

const page = async ({ params: { id } }) => {
  const book = await getBook(id);
  const similarBooks = await getSimilarBooks(
    book.book_id,
    book.genre,
    book.authors
  );

  return (
    <>
      <div className='mt-15 m-10 flex flex-col items-start gap-10 md:flex-row px-16'>
        {/* Image Container */}
        <DisplayBookImages book={book} />

        {/* Product Details */}
        <div className='flex-1'>
          <h1 className='text-3xl font-bold text-gray-800'>{book?.title}</h1>
          <h2 className='mb-5 mt-5 text-xl font-semibold text-gray-700'>
            Synopsis
          </h2>
          <p className='mb-5 text-base text-gray-600'>{book?.synopsis}</p>

          {/* Additional Book Details */}
          <div className='mt-5 space-y-2'>
            <p className='text-lg font-medium text-gray-700'>
              Authors: {book?.authors}
            </p>
            <p className='text-lg font-medium text-gray-700'>
              Genre: {book?.genre}
            </p>
            <p className='text-lg font-medium text-gray-700'>
              Publisher: {book?.publisher}
            </p>
            <p className='text-lg font-medium text-gray-700'>
              Publication Date:{' '}
              {book?.publication_date &&
                new Date(book?.publication_date).toLocaleDateString()}
            </p>
            <p className='text-lg font-medium text-gray-700'>
              Price: ${book?.price.toFixed(2)}
            </p>
            <p className='text-lg font-medium text-gray-700'>
              ISBN: {book?.isbn}
            </p>
            <p
              className={`text-lg font-medium ${
                book?.is_hardcover ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {book?.is_hardcover ? 'Hardcover' : 'Paperback'}
            </p>
            <p className='text-lg font-medium text-gray-700'>
              Rating: {book?.average_rating} / 5
            </p>
          </div>

          {/* Buy Now Button */}
          <AddToCartButton book={book} />
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-center text-2xl font-bold text-gray-800'>
          You may also like
        </h2>
        <div className='mt-5 flex space-x-5 overflow-x-auto'>
          {/* Place for similar book cards */}
          {similarBooks?.map((book) => (
            <BookCard key={book.book_id} value={book} />
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
