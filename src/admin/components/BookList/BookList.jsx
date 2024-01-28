import BookCard from '@/components/BookCard/BookCard';


const BookList = ({ books }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {books?.map(book => (
          <BookCard key={book.book_id} value={book} />
        ))}
      </div>
    </div>
  );
};


export default BookList;
