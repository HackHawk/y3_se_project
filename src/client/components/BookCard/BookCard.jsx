import React from "react";
import { Card, CardBody } from "@nextui-org/react";

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
      <div className="flex justify-center items-center m-5">
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">{value.title}</h2>
        <p className="text-base text-gray-500 dark:text-gray-400">
          by {value.author} | Date: {value.publication_date} | ISBN: {value.ISBN} | {value.genre}
        </p>
        <p className="text-base font-italic">Rating: {value.rating}</p>
        <span className="ml-2 text-yellow-500 dark:text-yellow-300">
          {"⭐".repeat(value.rating)}
        </span>
      </div>
    </Card>
  );
};

export default BookCard;
