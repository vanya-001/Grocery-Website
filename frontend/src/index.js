import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from '../src/page/Home'
import About from '../src/page/About'
import Contact from '../src/page/Contact'
import Menu from '../src/page/Menu'
import Login from './page/Login';
import NewProduct from './page/NewProduct';
import Signup from './page/Signup';
import { Provider } from 'react-redux';
import { store } from './redux';
import Cart from './page/Cart';
import Success from './page/Success';
import Cancel from './page/Cancel';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element={<App />} >
      <Route index element={<Home />} />
      <Route path='menu/:filterby' element={<Menu />} />
      <Route path = 'about' element={<About />} />
      <Route path = 'contact' element={<Contact />} />
      <Route path = 'login' element={<Login />} />
      <Route path = 'newproduct' element={<NewProduct />} />
      <Route path = 'signup' element={<Signup />} />
      <Route path = 'cart' element = {<Cart />} />
      <Route path = 'success' element = {<Success />} />
      <Route path = 'cancel' element = {<Cancel />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
  <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
