import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ProtectedRoute } from "./components/ProtectedRoute";
import IndexPage from "./pages";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import LoginPage from "./pages/login";
import ProductPage from "./pages/products";
import ProfilePage from "./pages/profile";

export const routes = [
  {
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <ProtectedRoute><IndexPage /></ProtectedRoute>,
      },
      {
        path: "/products/:id",
        element: <ProtectedRoute><ProductPage /></ProtectedRoute>,
      },
      {
        path: "/cart",
        element: <ProtectedRoute><CartPage /></ProtectedRoute>,
      },
      {
        path: "/checkout",
        element: <ProtectedRoute><CheckoutPage /></ProtectedRoute>,
      },
      {
        path: "/profile",
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
