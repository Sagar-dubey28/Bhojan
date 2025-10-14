import { createContext, useContext, useEffect, useState } from "react";

// Create context
const CartContext = createContext();

// Custom hook for easy access
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCart) setCartItems(storedCart);
  }, []);

  // Save to LocalStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item) => {
    const isAlreadyInCart = cartItems.find((cartItem) => cartItem._id === item._id);

    if (isAlreadyInCart) {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (_id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  // Clear all items
  const clearCart = () => {
    setCartItems([]);
  };

  // Increment item quantity
  const incrementQuantity = (_id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement item quantity
  const decrementQuantity = (_id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      clearCart,
      incrementQuantity,
      decrementQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
};
