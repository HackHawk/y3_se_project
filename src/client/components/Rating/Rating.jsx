import React from 'react';
import FilledStarIcon from '../Icons/FilledStarIcon'; // This should be your filled star icon component
import UnfilledStarIcon from '../Icons/UnfilledStarIcon'; // This should be your unfilled star icon component

const Rating = ({ average_rating }) => {
  // Ensure that average_rating is a number and clamp it between 0 and 5
  const rating = Math.max(0, Math.min(5, Number(average_rating)));

  return (
    <div className='flex'>
      {[...Array(5)].map((_, index) => {
        // If index is less than the rating, return a filled star
        if (index < rating) {
          return <FilledStarIcon key={index} />;
        }
        // Otherwise, return an unfilled star
        return <UnfilledStarIcon key={index} />;
      })}
    </div>
  );
};

export default Rating;
