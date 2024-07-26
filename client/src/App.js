import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CartProvider from './contexts/CartContext';
import AuthProvider from './contexts/AuthContext';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import Signin from './components/Signin';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <main>
          <AuthProvider>
            <CartProvider>
              <Switch>
                <Route path="/checkout">
                  <Checkout />
                </Route>
                <Route path="/orders">
                  <OrderHistory />
                </Route>
                <Route path="/signin">
                  <Signin />
                </Route>
                <Route path="/products/:id">
                  <ProductDetails />
                </Route>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </CartProvider>
          </AuthProvider>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
