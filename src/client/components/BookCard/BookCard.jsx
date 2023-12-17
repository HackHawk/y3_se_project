import React from "react";
import { Card } from "@nextui-org/react";
import StarIcon from "../Icons/StarIcon";
import CoverPage from "../CoverPage/CoverPage";

const BookCard = ({ value }) => {
  return (
    <Card className="
    hover
    w-full
    shadow-md
    hover:shadow-lg
    p-5
    mb-4
    bg-orange-200
    rounded-lg
    max-w-screen-2xl
    border border-gray-200 dark:border-gray-900"
    >
      <div className="flex flex-row justify-normal items-center">
        <div className="flex justify-center items-center m-5">
          {/* Specify the image url by using the {imageUrl} prop*/}
          <CoverPage />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">{value.title}</h2>
          <p className="text-base text-gray-500 dark:text-gray-400">
            by {value.author} | Date: {value.publication_date} | ISBN: {value.ISBN} | Genre: {value.genre}
          </p>
          <p className="text-base font-italic">
            Rating: {value.rating > 0 && (
              <span className="text-yellow-500 dark:text-yellow-300 flex items-center">
                {Array.from({ length: value.rating }).map((_, index) => (
                  <StarIcon key={index} />
                ))}
              </span>
            )}
          </p>
        </div>
      </div>
    </Card>

  );
};

export default BookCard;
