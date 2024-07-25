// src/components/ShoppingCart.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getCart, addToCart, removeFromCart } from '../utils/database';

const ShoppingCart = () => {
  const { currentUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (currentUser) {
        const cartItems = await getCart(currentUser.uid);
        setCart(cartItems);
      }
    };
    fetchCart();
  }, [currentUser]);

  const handleAddToCart = async (product) => {
    if (currentUser) {
      await addToCart(currentUser.uid, product);
      // Update the cart state
      const updatedCart = await getCart(currentUser.uid);
      setCart(updatedCart);
    }
  };

  const handleRemoveFromCart = async (product) => {
    if (currentUser) {
      await removeFromCart(currentUser.uid, product);
      // Update the cart state
      const updatedCart = await getCart(currentUser.uid);
      setCart(updatedCart);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
          <button onClick={() => handleRemoveFromCart(item)}>Remove from Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;
