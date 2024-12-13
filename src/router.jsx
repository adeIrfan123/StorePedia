import { createBrowserRouter, redirect } from "react-router-dom";
import ListProduct from "./pages/ListProduct";
import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <ListProduct />,
      },
      {
        path: "ProductDetail/:id",
        element: <ProductDetail />,
      },
      {
        path: "Cart",
        element: <CartPage />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect("/LoginPage");
          }
          return null;
        },
      },
    ],
  },
  {
    path: "LoginPage",
    element: <LoginPage />,
  },
]);
export default router;
