import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Header() {
  const [scroll, setScroll] = useState(false);
  let navigate = useNavigate();

  const login = () => {
    navigate("LoginPage");
  };
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const cart = () => {
    navigate("Cart");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, []);

  let scrollActive = scroll
    ? "py-2 bg-[#F0BB78] opacity-85 shadow-sm shadow-black"
    : "py-4";

  return (
    <>
      <nav
        className={`w-full bg-[#F0BB78] font-poppins px-6 mx-auto fixed flex justify-between items-center transition-all ${scrollActive} lg:px-16`}
      >
        <Link to="/" className="font-bold text-3xl">
          StorePedia
        </Link>

        <div className="flex">
          <button
            onClick={cart}
            className="bg-[#C9E6F0] py-1 px-4 mx-3 font-bold rounded-md shadow"
          >
            Cart
          </button>
          <div className="bg-lime-200 p-2 text-center font-semibold rounded-md">
            {localStorage.getItem("token") && (
              <button onClick={() => logOut()}>LogOut</button>
            )}
            {!localStorage.getItem("token") && (
              <button onClick={() => login()}>Login</button>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Header;
