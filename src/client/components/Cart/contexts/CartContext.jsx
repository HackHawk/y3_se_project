'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Try to get cart from localStorage
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    // Save cartItems to localStorage whenever it changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (item, quantityChange = 1) => {
    setCartItems((currentItems) => {
      const itemInCart = currentItems.find((i) => i.id === item.id);
      if (itemInCart) {
        return currentItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantityChange } : i
        ).filter(i => i.quantity > 0); // Ensure we don't keep items with 0 quantity
      }
      // Add a new item if it's not already in the cart and the quantityChange is positive
      if (quantityChange > 0) {
        return [...currentItems, { ...item, quantity: 1 }];
      }
      return currentItems; // If item is not in cart and quantityChange is not positive, do nothing
    });
  };
  

  const removeFromCart = (itemId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
