import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const OrderHistory = () => {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the user's order history from the database or API
    const fetchOrders = async () => {
      const response = await fetch(`/api/orders?userId=${currentUser.id}`);
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, [currentUser.id]);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
