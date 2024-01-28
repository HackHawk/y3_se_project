// TODO: MAKE PAGE SERVER SIDE
// TODO: Identify which parts need to be client side and move this parts needing interactivity to their own components
// TODO: We don't need useBooks, and useGenres. We can just call them in an async function. We can then put the thing we need on Suspense Boundary
// TODO: Implement Server Side Pagination
// TODO: Recommended Books and ShowBooks should be its own component with each fetching its own data.

'use client';

import { useState } from 'react';

import DisplayPagination from '@/components/Pagination/Pagination';
import Searchbar from '@/components/Searchbar/Searchbar';
import CardSkeleton from '@/components/Skeleton/CardSkeleton';
import BookList from '@/components/BookList/BookList';
import useBooks from '@/lib/useBooks';
import useGenres from '@/lib/useGenres';

export default function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [genreFilter, setGenreFilter] = useState([]);
  const [keywordFilter, setKeywordFilter] = useState('');
  const defaultPageSize = 10;

  const { books, loading } = useBooks(keywordFilter, genreFilter);
  const genres = useGenres();

  const handleSearch = (keyword, selectedGenres) => {
    setKeywordFilter(keyword);
    setGenreFilter(selectedGenres);
  };

  function onPageChange(newPage) {
    setCurrentPage(newPage);
  }

  const renderBookList = () => {
    const startIndex = (currentPage - 1) * defaultPageSize;
    const endIndex = startIndex + defaultPageSize;
    return books.slice(startIndex, endIndex);
  };

  return (
    <div className='max-w-flex flex-col rounded-lg'>
      <Searchbar handleSearch={handleSearch} genres={genres} />

      <h2>Search results</h2>

      <p className='text-base font-semibold text-gray-700'>
        {books.length} Books Found
      </p>

      {/* Books List Display */}
      {loading ? (
        <div className='mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <BookList books={renderBookList()} />
      )}

      {/* Display Pagination */}
      {books.length >= 1 && (
        <div className='items-center'>
          <DisplayPagination
            totalItems={books.length}
            itemsPerPage={defaultPageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
