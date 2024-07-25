// src/utils/database.js
import { firestore } from './firebase';

export const addProduct = async (product) => {
  try {
    await firestore.collection('products').add(product);
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const snapshot = await firestore.collection('products').get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addToCart = async (userId, product) => {
  try {
    await firestore.collection('users').doc(userId).collection('cart').add(product);
  } catch (error) {
    console.error(error);
  }
};

export const getCart = async (userId) => {
  try {
    const snapshot = await firestore.collection('users').doc(userId).collection('cart').get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const placeOrder = async (userId, order) => {
  try {
    await firestore.collection('users').doc(userId).collection('orders').add(order);
  } catch (error) {
    console.error(error);
  }
};

export const getOrders = async (userId) => {
  try {
    const snapshot = await firestore.collection('users').doc(userId).collection('orders').get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
    return [];
  }
};
