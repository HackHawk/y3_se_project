'use client';
import Image from 'next/image'; // Import Image component from Next.js
import { useCart } from "./contexts/CartContext";

const CartItems = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();

  const decreaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    addToCart({ ...item }, -1);
  };

  const increaseQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    addToCart({ ...item }, 1);
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        cartItems.map((item) => {
          // Determine the image URL for each item
          let imageUrl = item.cover_page_urls ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/coverpages/${item.cover_page_urls[0]}` : '/Default_book_image.png'; // Provide a default image path if necessary
          console.log(item)
          return (
            <div key={item.id} className="flex items-center justify-between mb-4 bg-white shadow rounded-lg p-4">
              <div className="flex items-center">
                {/* Use the Next.js Image component */}
                <div className="h-24 w-24 relative mr-4">
                  <Image 
                    src={imageUrl} 
                    alt={item.title} 
                    layout="fill" // Use either 'fixed', 'intrinsic', 'responsive', or 'fill'
                    objectFit="cover" // Adjust according to your needs
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-500">{item.authors}</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">${item.price}</p>
                <div className="flex items-center justify-center mt-2">
                  <button className="px-2 py-1 text-sm font-semibold text-gray-600 bg-gray-200 rounded" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span className="px-4 py-1">{item.quantity}</span>
                  <button className="px-2 py-1 text-sm font-semibold text-gray-600 bg-gray-200 rounded" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <button className="text-sm text-red-500 hover:underline mt-2" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartItems;
