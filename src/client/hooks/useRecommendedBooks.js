import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';

const useRecommendedBooks = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  useEffect(() => {
    async function fetchRecommendedBooks() {
      try {
        const { data, error } = await supabase.rpc(
          'retrieve_prioritized_books'
        );
        if (error) throw error;
        setRecommendedBooks(data);
      } catch (error) {
        console.error('Error in fetching recommended books:', error);
      }
    }

    fetchRecommendedBooks();
  }, []);

  return { recommendedBooks };
};

export default useRecommendedBooks;
