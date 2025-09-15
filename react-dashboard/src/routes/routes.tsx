import { createBrowserRouter } from 'react-router-dom';
import Login from '../app/auth/Login';
import CategoryPage from '../app/category/Category';
import Dashboard from '../app/dashboard/Dashboard';
import AddLead from '../app/lead/AddLead';
import LeadPage from '../app/lead/Lead';
import OportunityPage from '../app/oportunity/Oportunity';
import Order from '../app/order/Order';
import AddProduct from '../app/product/AddProduct';
import EditProduct from '../app/product/EditProduct';
import Product from '../app/product/Product';
import Setting from '../app/setting/Setting';
import AddUser from '../app/user/AddUser';
import EditUser from '../app/user/EditUser';
import UserPage from '../app/user/User';
import UserProfile from '../app/user/UserProfile';
import VariantPage from '../app/variant/variant';
import { Layout } from '../common/layout';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import EditLead from '../app/lead/EditLead';

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
        path: '/lead/edit/:id',
        element: (
          <PrivateRoute>
            <EditLead />
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
