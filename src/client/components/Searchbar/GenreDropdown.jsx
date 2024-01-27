import { Select, SelectItem } from '@nextui-org/react';

const GenreDropdown = ({ selectedGenres, setSelectedGenres, genres }) => {
  return (
    <>
      <Select
        label='Filter Genre'
        placeholder='Select genres'
        selectionMode='multiple'
        className='w-72'
        selectedKeys={selectedGenres}
        onSelectionChange={setSelectedGenres}
      >
        {genres.map((genre, index) => (
          <SelectItem key={index} value={genre.genre_name}>
            {genre.genre_name}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default GenreDropdown;
