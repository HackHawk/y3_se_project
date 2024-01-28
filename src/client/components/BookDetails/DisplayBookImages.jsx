'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import DefaultImage from '/public/Default_book_image.png';

function generateImageUrl(index, cover_page_urls) {
  if (cover_page_urls) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/coverpages/${cover_page_urls[index]}`;
  }
}

const DisplayBookImages = ({ book }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className='items-right flex flex-col'>
      {book.cover_page_urls ? (
        <Image
          // loader={customLoader}
          src={generateImageUrl(index, book.cover_page_urls)}
          alt='Book Cover'
          width={300}
          height={200}
          unoptimized={process.env.NODE_ENV !== 'production'}
          className='mb-4'
        />
      ) : (
        <Image
          src={DefaultImage}
          alt='Default Book Cover'
          className='cover-image'
          width={300}
          height={200}
        />
      )}
      <div className='flex gap-2'>
        {book.cover_page_urls?.map((_, i) => (
          <Image
            key={i}
            src={generateImageUrl(i, book.cover_page_urls)}
            className={`cursor-pointer rounded-md ${
              i === index ? 'bg-red-500' : 'bg-gray-200'
            } h-16 w-16`} // Adjusted size for Tailwind's default
            onClick={() => setIndex(i)}
            width={70} // Adjust the size as needed
            height={70}
            unoptimized={process.env.NODE_ENV !== 'production'}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayBookImages;
