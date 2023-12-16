import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "../Icons/SearchIcon";

const Searchbar = ({ handleKeywordChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    handleKeywordChange(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div className="flex flex-row">
          <Input
            isClearable
            type="text"
            label="Search"
            variant="bordered"
            placeholder="Search Book"
            labelPlacement={"outside-left"}
            onClear={() => setInputValue("")}
            value={inputValue}
            onChange={handleInputChange}
            className="max-w-xs"
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Button type="submit">
            <SearchIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
