import CoverPage from './CoverPage'; // This component should render the book's cover image
import Rating from '../Rating/Rating'; // This component should render the book rating
import Link from 'next/link';

const BookCard = ({ value }) => {
  let src;
  if (value.cover_page_urls) {
    src = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/coverpages/${value.cover_page_urls[0]}`;
  }

  return (
    // Pass book id as dynamic route parameter
    <Link href={`/admin/books/${value.book_id}`}>
      <div className='group relative transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-gray-100'>
        <div className='absolute right-0 top-0 rounded-bl-lg bg-green-200 px-2 py-1 text-sm font-bold text-green-800'>
          In Stock
        </div>
        <div className='flex items-center justify-center pb-5 pt-5'>
          <CoverPage imageUrl={src} />
        </div>
        <div className='px-5 pb-5 text-left'>
          <h2 className='mb-2 text-xl font-semibold'>{value.title}</h2>
          <p className='text-base text-gray-600'>{value.authors}</p>
          <div className='justify-left mt-2.5 flex'>
            <Rating value={value.average_rating} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
