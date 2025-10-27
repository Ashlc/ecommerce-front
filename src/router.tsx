import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import IndexPage from "./pages";
import CartPage from "./pages/cart";
import CheckoutPage from "./pages/checkout";
import ProductPage from "./pages/products";

export const routes = [
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
