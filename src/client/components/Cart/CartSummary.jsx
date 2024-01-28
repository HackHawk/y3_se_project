// CartSummary.js
'use client';
import { useCart } from './contexts/CartContext';

const CartSummary = () => {
    const { cartItems, totalQuantity } = useCart();

    const numberOfBooks = totalQuantity;
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="p-6 border border-blue-100 dark:bg-gray-900 dark:border-gray-900 bg-gray-50 md:p-8">
            <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-gray-400">Order Summary</h2>
            <div className="flex items-center justify-between pb-4 mb-4">
                <span className="text-gray-700 dark:text-gray-400">Number of Books</span>
                <span className="text-xl font-bold text-gray-700 dark:text-gray-400">{numberOfBooks}</span>
            </div>
            
            <div className="flex items-center justify-between pb-4 mb-4">
                <span className="text-gray-700 dark:text-gray-400">Total</span>
                <span className="text-xl font-bold text-gray-700 dark:text-gray-400">${total.toFixed(2)}</span>
            </div>
            {/* Checkout Button */}
            <div className="flex items-center justify-between">
                <button className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-blue-500 rounded-md hover:bg-blue-600">Checkout</button>
            </div>
        </div>
    );
};

export default CartSummary;
