import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CartContext } from './CartContext';
import { AuthContext } from './AuthContext';

const Checkout = () => {
  const { cart, totalCost, clearCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Process the order
    const order = {
      userId: currentUser.id,
      items: cart,
      total: totalCost,
      shippingAddress,
      paymentMethod,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        clearCart();
        history.push('/orders');
      } else {
        console.error('Error processing order');
      }
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Shipping Address:
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </label>
        <label>
          Payment Method:
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          />
        </label>
        <p>Total: ${totalCost.toFixed(2)}</p>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
