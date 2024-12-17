import { createBrowserRouter } from "react-router-dom";
import ListProduct from "./pages/ListProduct";
import LoginPage from "./pages/LoginPage";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";

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
        element: (
          <ProtectedRoutes>
            <CartPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "LoginPage",
    element: <LoginPage />,
  },
]);
export default router;
