import { useState, useEffect } from 'react';
import supabase from '@/app/lib/supabaseClient';

const useBooks = (keywordFilter, genreFilter) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      
      try {
        const { data, error } = await await supabase.rpc('retrieve_books', { pattern: `${keywordFilter}%`, genre_param: genreFilter });
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
