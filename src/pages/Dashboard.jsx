import Header from "../components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slice";
function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("masuk");
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <Header />
    </>
  );
}
export default Dashboard;
