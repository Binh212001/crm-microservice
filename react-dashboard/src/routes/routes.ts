import { createBrowserRouter } from 'react-router-dom';
import CategoryPage from '../app/category/Category';
import AddUser from '../app/user/AddUser';
import User from '../app/user/User';
import Dashboard from '../app/dashboard/Dashboard';
import Order from '../app/order/Order';
import AddProduct from '../app/product/AddProduct';
import Product from '../app/product/Product';
import EditProduct from '../app/product/EditProduct';
import { Layout } from '../common/layout';
import UserProfile from '../app/user/UserProfile';
import VariantPage from '../app/variant/variant';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/dashboard',
        Component: Dashboard,
      },
      {
        path: '/product',
        Component: Product,
      },
      {
        path: '/add-product',
        Component: AddProduct,
      },
      {
        path: '/edit-product/:id',
        Component: EditProduct,
      },
      {
        path: '/category',
        Component: CategoryPage,
      },
      {
        path: '/variant',
        Component: VariantPage,
      },

      {
        path: '/user',
        Component: User,
      },
      {
        path: '/add-user',
        Component: AddUser,
      },
      {
        path: '/order',
        Component: Order,
      },
      {
        path: '/user/:userId',
        Component: UserProfile,
      },
    ],
  },
]);
