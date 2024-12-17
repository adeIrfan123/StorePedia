import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  let location = useLocation();
  console.log(location);
  if (!localStorage.getItem("token")) {
    return <Navigate state={{ from: location }} to="/LoginPage" />;
  }
  return children;
}
