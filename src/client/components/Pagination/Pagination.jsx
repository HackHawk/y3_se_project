import React from 'react';
import { Pagination } from '@nextui-org/react';

const DisplayPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  // Fix the current page underline part
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <span
        key={i}
        onClick={() => changePage(i)}
        className={currentPage === i ? 'mr-10 underline' : 'ml-10 no-underline'}
      >
        {i}
      </span>
    );
  }

  return (
    <div className='flex justify-center'>
      <Pagination
        isCompact
        showControls
        total={totalPages}
        initialPage={1}
        page={currentPage}
        onChange={(e) => {
          changePage(e);
        }}
        size='lg'
      />
    </div>
  );
};

export default DisplayPagination;
