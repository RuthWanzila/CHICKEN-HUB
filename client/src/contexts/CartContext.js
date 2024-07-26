// CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Load cart from local storage on component mount
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
    calculateTotals();
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    // Check if product is already in the cart
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      // Update the quantity of the existing item
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setCart(updatedCart);
    } else {
      // Add the new product to the cart
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    // Remove the product from the cart
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const calculateTotals = () => {
    // Calculate the total number of items and the total cost
    let totalItems = 0;
    let totalCost = 0;
    cart.forEach((item) => {
      totalItems += item.quantity;
      totalCost += item.price * item.quantity;
    });
    setTotalItems(totalItems);
    setTotalCost(totalCost);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        totalCost,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
