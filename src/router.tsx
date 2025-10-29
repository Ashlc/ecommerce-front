import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ProtectedRoute } from "./components/ProtectedRoute";
import IndexPage from "./pages";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import LoginPage from "./pages/login";
import ProductPage from "./pages/products";
import ProfilePage from "./pages/profile";
import RecommendationsPage from "./pages/recommendations";

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
        element: <IndexPage />,
      },
      {
        path: "/recommendations",
        element: <RecommendationsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/checkout",
            element: <CheckoutPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
