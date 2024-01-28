import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { SearchIcon } from '../Icons/SearchIcon';
import GenreDropdown from './GenreDropdown';
const Searchbar = ({ handleSearch, genres }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  let selectedGenresWithoutIndex;

  const handleSumbit = (e) => {
    e.preventDefault();
    selectedGenresWithoutIndex = [];
    selectedGenres.forEach((index) =>
      selectedGenresWithoutIndex.push(genres[index].genre_name)
    );
    handleSearch(inputValue, selectedGenresWithoutIndex);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div className='mt-5 flex max-w-xl flex-col items-start gap-2 md:flex-row md:items-center'>
          <Input
            isClearable
            type='text'
            variant='bordered'
            placeholder='Search books by title and authors'
            onClear={() => setInputValue('')}
            value={inputValue}
            onChange={handleInputChange}
            className='max-w-fit shrink'
            startContent={
              <SearchIcon className='pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90' />
            }
          />
          <GenreDropdown
            genres={genres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />

          <Button
            type='submit'
            size='lg'
            radius='sm'
            variant='solid'
            className='items-center bg-orange-700'
          >
            <SearchIcon color='white' />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
