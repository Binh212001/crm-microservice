import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import CategoryPage from '../app/category/Category';
import AddUser from '../app/user/AddUser';
import UserPage from '../app/user/User';
import Dashboard from '../app/dashboard/Dashboard';
import Order from '../app/order/Order';
import AddProduct from '../app/product/AddProduct';
import Product from '../app/product/Product';
import EditProduct from '../app/product/EditProduct';
import { Layout } from '../common/layout';
import UserProfile from '../app/user/UserProfile';
import VariantPage from '../app/variant/variant';
import EditUser from '../app/user/EditUser';
import LeadPage from '../app/lead/Lead';
import OportunityPage from '../app/oportunity/Oportunity';
import Setting from '../app/setting/Setting';
import Login from '../app/auth/Login';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import AddLead from '../app/lead/AddLead';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute restricted>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/product',
        element: (
          <PrivateRoute>
            <Product />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-product',
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: '/edit-product/:id',
        element: (
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        ),
      },
      {
        path: '/category',
        element: (
          <PrivateRoute>
            <CategoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/variant',
        element: (
          <PrivateRoute>
            <VariantPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/user',
        element: (
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/user/add',
        element: (
          <PrivateRoute>
            <AddUser />
          </PrivateRoute>
        ),
      },
      {
        path: '/user/edit/:id',
        element: (
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        ),
      },
      {
        path: '/lead',
        element: (
          <PrivateRoute>
            <LeadPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/lead/add',
        element: (
          <PrivateRoute>
            <AddLead />
          </PrivateRoute>
        ),
      },
      {
        path: '/oportunity',
        element: (
          <PrivateRoute>
            <OportunityPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/setting',
        element: (
          <PrivateRoute>
            <Setting />
          </PrivateRoute>
        ),
      },
      {
        path: '/add-user',
        element: (
          <PrivateRoute>
            <AddUser />
          </PrivateRoute>
        ),
      },
      {
        path: '/order',
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      {
        path: '/user/:userId',
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
