// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { getProducts } from '../utils/database';
import ProductDetails from './ProductDetails';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getProducts();
      setProducts(productData);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div>
        {products.map((product) => (
          <ProductDetails key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
