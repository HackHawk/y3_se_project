'use client';

import { useContext } from 'react';
// import { CartContext } from '@/context/CartContext';/
import { CartContext } from './contexts/CartContext';// Adjust the path as necessary

const AddToCartButton = ({ book }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <button
      type="button"
      className="mt-5 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-700"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton; // This component is now explicitly client-side
