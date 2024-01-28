import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';

const useGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const { data: genresData, error } = await supabase.from("genres").select();
        if (error) throw error;
        setGenres(genresData);
      } catch (error) {
        console.error("Error in fetching genres:", error);
      }
    }

    fetchGenres();
  }, []);

  return genres;
};

export default useGenres;
