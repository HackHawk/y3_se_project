"use client";

import BookCard from "@/components/BookCard/BookCard";
import DisplayPagination from "@/components/Pagination/Pagination";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner/Spinner";
import supabase from "@/lib/supabaseClient";
import { Skeleton, skeleton } from "@nextui-org/react";
import CardSkeleton from "@/components/Skeleton/CardSkeleton";

export default function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState([]);
  const [keywordFilter, setKeywordFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [genre, setGenres] = useState([]);

  const defaultPageSize = 5;

  useEffect(() => {
    async function filterBooks() {
      setLoading(true);

      try {
        let query = supabase.from("books").select();

        if (keywordFilter) {
          // Construct a combined 'OR' condition for different fields
          const condition = `title.ilike.${keywordFilter}%,authors.ilike.%${keywordFilter}%, amhr_title.ilike.${keywordFilter}%`;
          query = query.or(condition);
        }

        // Add genre filter if any genre is selected
        if (genreFilter.length > 0) {
          query = query.in("genre", genreFilter);
        }

        const { data: books, error } = await query;
        const { data: genres } = await supabase.rpc("get_distinct_genres");
        setGenres(genres);

        if (error) {
          throw error;
        }

        console.log(books);
        setFilteredBooks(books);
        setCurrentPage(1);
        setLoading(false);
      } catch (error) {
        console.error("Error occurred during fetch:", error);
        setLoading(false);
      }
    }

    filterBooks();
  }, [genreFilter, keywordFilter]);

  function renderTableData() {
    const startIndex = (currentPage - 1) * defaultPageSize;
    const endIndex = startIndex + defaultPageSize;

    return filteredBooks.slice(startIndex, endIndex).map((book, index) => {
      return <BookCard value={book} key={book.ISBN} />
    });
  }

  function onPageChange(newPage) {
    setCurrentPage(newPage);
  }

  const handleSearch = (keyword, selectedGenres) => {
    console.log(selectedGenres);
    setKeywordFilter(keyword);
    setGenreFilter(selectedGenres);
  };

  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <div className=" max-w-flex flex-col max-w-6xl p-5 gap-5 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <Searchbar handleSearch={handleSearch} genres={genre} />

        <p className="text-base font-semibold p-5 text-gray-700 dark:text-gray-200">
          Books Found: {filteredBooks.length}
        </p>

        {/* Books List Display */}
        <div className="mt-4 justify-center">{loading ? (<><CardSkeleton /><CardSkeleton /><CardSkeleton /></>) : renderTableData()}</div>


        {/* Display Pagination */}
        {filteredBooks.length >= 1 && (
          <DisplayPagination
            totalItems={filteredBooks.length}
            itemsPerPage={defaultPageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  );
}
