import React, { useState } from "react";
import { Select, SelectItem, Chip, Button } from "@nextui-org/react";

const Sidebar = ({ handleGenreChange }) => {
  const genres = ["Biography", "Science", "History", "Non-Fiction"];
  const [selectedGenres, setSelectedGenres] = useState([]);
  let selectedGenresWithoutIndex;

  const handleClick = () => {
    selectedGenresWithoutIndex = [];
    selectedGenres.forEach((index) =>
      selectedGenresWithoutIndex.push(genres[index])
    );
    handleGenreChange(selectedGenresWithoutIndex);
  };

  return (
    <>
      <Select
        label="Book Genre"
        placeholder="Select genres"
        selectionMode="multiple"
        className="max-w-xs"
        selectedKeys={selectedGenres}
        onSelectionChange={setSelectedGenres}
      >
        {genres.map((genre, index) => (
          <SelectItem key={index} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </Select>
      <Button onClick={() => handleClick()}>Filter Items</Button>
    </>
  );
};

export default Sidebar;
