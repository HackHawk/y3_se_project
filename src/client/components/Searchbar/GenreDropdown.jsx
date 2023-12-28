import React, { useState } from "react";
import { Select, SelectItem, Chip, Button } from "@nextui-org/react";

const GenreDropdown = ({ selectedGenres, setSelectedGenres, genres}) => {

  return (
    <>
      <Select
        label="Filter Genre"
        placeholder="Select genres"
        selectionMode="multiple"
        className="w-72"
        selectedKeys={selectedGenres}
        onSelectionChange={setSelectedGenres}
      >
        {genres.map((genre, index) => (
          <SelectItem key={index} value={genre}>
            {genre.genre}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default GenreDropdown;
