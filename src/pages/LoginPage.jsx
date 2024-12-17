import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const validateInput = () => {
    if (!email || !password) {
      setError("Email dan password harus diisi.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateInput()) return;

    try {
      const { data: users } = await axios.get("https://fakestoreapi.com/users");
      console.log(users.data);

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem("token", JSON.stringify(user));
        navigate(location.state?.from || "/");
      } else {
        setError("Email atau password salah.");
      }
    } catch (err) {
      // Tangani error login
      setError("Terjadi kesalahan saat login. Coba lagi nanti.");
      console.error("Error Login:", err);
    }
  };

  return (
    <div className="w-full font-poppins h-screen flex items-center justify-center">
      <div className="bg-orange-400 w-[360px] rounded-lg shadow-md shadow-slate-500">
        <h1 className="pt-5 text-white font-bold text-3xl text-center">
          Login Dulu Brokk
        </h1>
        {error && (
          <p className="text-red-600 text-center mt-2 font-semibold">{error}</p>
        )}
        <form
          onSubmit={handleLogin}
          className="py-5 flex flex-col w-72 items-center justify-center mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan Email..."
            className="py-1 px-3 rounded-full w-52 my-3 border border-gray-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan Password"
            className="py-1 px-3 rounded-full w-52 border border-gray-300"
          />
          <button
            type="submit"
            className="w-52 p-2 my-3 bg-slate-500 font-bold text-white shadow-md shadow-black/35 rounded-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
