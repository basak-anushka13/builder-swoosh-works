import React from "react";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export const Cart: React.FC = () => {
  const {
    state,
    removeItem,
    updateQuantity,
    clearCart,
    closeCart,
    getTotalPrice,
  } = useCart();

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to proceed with checkout");
      closeCart();
      window.location.href = "/login";
      return;
    }

    try {
      // In a real app, you'd create a booking/order here
      const bookingData = {
        items: state.items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        totalAmount: `₹${getTotalPrice().toFixed(2)}`,
      };

      console.log("Creating booking:", bookingData);

      // Simulate API call
      setTimeout(() => {
        alert("Order placed successfully! You can view it in your dashboard.");
        clearCart();
        closeCart();
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeCart}
      />

      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart
            </h2>
            <button
              onClick={closeCart}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={closeCart}
                  className="mt-4 text-emerald-600 hover:text-emerald-700"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b border-gray-200 pb-4"
                  >
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-sm font-semibold text-emerald-600">
                        {item.price}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Total</p>
                <p>₹{getTotalPrice().toFixed(2)}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <p className="mt-4 text-center text-sm text-gray-500">
                or{" "}
                <button
                  onClick={closeCart}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
