import CoverPage from "./CoverPage"; // This component should render the book's cover image
import Rating from "../Rating/Rating"; // This component should render the book rating
import Link from "next/link";

const BookCard = ({ value }) => {
  let src;
  if (value.cover_page_urls) {
    src = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/coverpages/${value.cover_page_urls[0]}`;
  }

  return (
    // Pass book id as dynamic route parameter
    <Link href={`/books/${value.book_id}`}>
    <div className="relative group bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-gray-100">
      <div className="absolute top-0 right-0 px-2 py-1 bg-green-200 text-green-800 text-sm font-bold rounded-bl-lg">
        In Stock
      </div>
      <div className="flex justify-center items-center pt-5 pb-5">
        <CoverPage imageUrl={src} />
      </div>
      <div className="px-5 pb-5 text-left">
        <h2 className="text-xl font-semibold mb-2">{value.title}</h2>
        <p className="text-base text-gray-600">{value.authors}</p>
        <div className="flex justify-left mt-2.5">
          <Rating value={value.average_rating} />
        </div>
      </div>
    </div>
    </Link>
  );
};

export default BookCard;
