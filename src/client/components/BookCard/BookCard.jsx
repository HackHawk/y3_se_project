import React from "react";
import { Card, CardBody } from "@nextui-org/react";

const BookCard = ({ value }) => {
  return (
    <Card
      isBlurred
      className="w-auto bg-slate-50 h-auto rounded-lg pr-0 ml-5 mr-10 mb-5 border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      shadow="sm"
    >

      <div className="float-left m-5">
        <p>BT</p>
      </div>
      <h2 className="">{value.title}</h2>
      <p>
        by {value.author} | Date: {value.publication_date} | ISBN: {value.ISBN} | {value.genre}
      </p>
      <p>Rating: {value.rating}</p>

      {/* Find out the meaning of this code */}
      <p>{Array.from({ length: value.rating }, () => "⭐").join("")}</p>
    </Card>
  );
};

export default BookCard;
