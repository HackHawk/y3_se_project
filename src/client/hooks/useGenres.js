import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';

const useGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const { data, error } = await supabase.rpc("get_distinct_genres");
        if (error) throw error;
        setGenres(data);
      } catch (error) {
        console.error("Error in fetching genres:", error);
      }
    }

    fetchGenres();
  }, []);

  return genres;
};

export default useGenres;
