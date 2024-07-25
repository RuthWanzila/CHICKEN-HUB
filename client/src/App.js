import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation'; 
import ProductList from './ProductList';
import ProductForm from './ProductForm';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
