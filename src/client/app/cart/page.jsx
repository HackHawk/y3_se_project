
import CartItems from "@/components/Cart/CartItems";
import CartSummary from "@/components/Cart/CartSummary";


const CartPage = () => {
  return (
      <section className="py-24 bg-gray-100 dark:bg-gray-700">
        <div className="px-4 py-6 mx-auto max-w-7xl">
          <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">Your Cart</h2>
          <div className="p-6 border bg-gray-50 dark:bg-gray-800">
            {/* Cart Items List */}
            <CartItems />
            {/* Summary and Checkout */}
          </div>
          <div className="w-full lg:w-1/2">
        <CartSummary />
    </div>
        </div>
      </section>
  );
};

export default CartPage;
