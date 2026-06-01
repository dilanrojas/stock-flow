import { Route, Routes } from 'react-router-dom';
import './app.css';

import AppLayout from './layouts/app-layout';
import Auth from './pages/auth';
import Categories from './pages/categories';
import Dashboard from './pages/dashboard';
import Movements from './pages/movements';
import Products from './pages/products';
import Purchases from './pages/purchases';
import Sales from './pages/sales';

export default function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Auth />}
      />

      <Route element={<AppLayout />}>
        <Route
          path='/dashboard'
          element={<Dashboard />}
        />
        <Route
          path='/categories'
          element={<Categories />}
        />
        <Route
          path='/products'
          element={<Products />}
        />
        <Route
          path='/sales'
          element={<Sales />}
        />
        <Route
          path='/purchases'
          element={<Purchases />}
        />
        <Route
          path='/movements'
          element={<Movements />}
        />
      </Route>
    </Routes>
  );
}
