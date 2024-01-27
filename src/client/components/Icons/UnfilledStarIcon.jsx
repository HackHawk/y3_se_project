// UnfilledStarIcon.js
import React from 'react';

const UnfilledStarIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5 text-gray-400' // Tailwind classes for size and color
    fill='none'
    viewBox='0 0 28 28'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M11.049 2.927c.396-1.198 2.107-1.198 2.503 0l1.89 5.717a1.5 1.5 0 001.421 1.047h6.012c1.26 0 1.778 1.611.855 2.377l-4.866 4.035a1.5 1.5 0 00-.443 1.658l1.891 5.717c.396 1.198-1.045 2.183-2.108 1.513l-4.865-3.603a1.5 1.5 0 00-1.755 0l-4.865 3.603c-1.063.67-2.504-.315-2.108-1.513l1.891-5.717a1.5 1.5 0 00-.443-1.658l-4.866-4.035c-.923-.766-.404-2.377.855-2.377h6.012a1.5 1.5 0 001.421-1.047l1.89-5.717z'
    />
  </svg>
);

export default UnfilledStarIcon;
