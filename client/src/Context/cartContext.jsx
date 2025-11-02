import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

// Create context
const CartContext = createContext();

// Custom hook for easy access
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  const storageKeyFor = (email) => `cartItems_${encodeURIComponent(email)}`;

  const loadCartForUser = (email) => {
    try {
      const key = storageKeyFor(email);
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.warn("Failed to load cart for user:", err);
      return [];
    }
  };

  const saveCartForUser = (email, items) => {
    try {
      const key = storageKeyFor(email);
      localStorage.setItem(key, JSON.stringify(items));
    } catch (err) {
      console.warn("Failed to save cart for user:", err);
    }
  };

  // Load saved cart for logged-in user; clear cart when no user (logout)
  useEffect(() => {
    if (user && user.email) {
      const saved = loadCartForUser(user.email);
      setCartItems(saved || []);
    } else {
      // no user => clear in-memory cart
      setCartItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Persist cart when it changes for logged-in user
  useEffect(() => {
    if (user && user.email) {
      saveCartForUser(user.email, cartItems);
    }
  }, [cartItems, user]);

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
