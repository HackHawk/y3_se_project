import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';

const useBooks = (keywordFilter, genreFilter) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        let query = supabase.from("books").select();

        if (keywordFilter) {
          const condition = `title.ilike.${keywordFilter}%,authors.ilike.%${keywordFilter}%, amhr_title.ilike.${keywordFilter}%`;
          query = query.or(condition);
        }

        if (genreFilter.length > 0) {
          query = query.in("genre", genreFilter);
        }

        const { data, error } = await query;
        if (error) throw error;
        setBooks(data);
      } catch (error) {
        console.error("Error in fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [keywordFilter, genreFilter]);

  return { books, loading };
};

export default useBooks;
