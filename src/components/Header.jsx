import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const [scroll, setScroll] = useState(false);
  let navigate = useNavigate();

  const login = () => {
    localStorage.setItem("access_token", "123qwerty");
    navigate("/");
  };
  const logOut = () => {
    localStorage.removeItem("access_token");
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
    ? "py-2 bg-slate-300 opacity-85 shadow-sm shadow-black"
    : "py-4";

  return (
    <>
      <nav
        className={`w-full px-16 mx-auto fixed flex justify-between items-center transition-all ${scrollActive}`}
      >
        <Link to="/" className="font-bold text-3xl">
          StorePedia
        </Link>
        {localStorage.getItem("access_token") && (
          <button onClick={() => logOut()}>LogOut</button>
        )}
        {!localStorage.getItem("access_token") && (
          <button onClick={() => login()}>Login</button>
        )}
        <div className="">
          <button
            onClick={cart}
            className="bg-green-400 py-1 px-4 mx-3 font-bold rounded-md shadow"
          >
            Cart
          </button>
          {/* <button
            onClick={login}
            className="bg-yellow-200 px-5 py-1 font-bold text-xl rounded-md shadow"
          >
            login
          </button> */}
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Header;
