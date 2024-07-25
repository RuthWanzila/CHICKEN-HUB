import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/products', { name, description, price, image })
      .then(response => {
        console.log('Product created:', response.data);
        setName('');
        setDescription('');
        setPrice(0);
        setImage('');
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Create a New Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input type="text" value={image} onChange={e => setImage(e.target.value)} />
        </label>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default ProductForm;
