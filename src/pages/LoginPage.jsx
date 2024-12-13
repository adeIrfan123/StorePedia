import React from "react";

function LoginPage() {
  return (
    <div className="w-full h-svh flex items-center justify-center">
      <div className="bg-orange-400 w-[360px] rounded-lg shadow-md shadow-slate-500">
        <h1 className=" pt-5 text-red-500 font-bold text-3xl text-center">
          Login Dulu Brokk
        </h1>
        <form
          action=""
          className="py-5 flex flex-col w-72 items-end justify-center"
        >
          <input
            type="email"
            placeholder="Masukan Email..."
            className="py-1 px-3 rounded-full w-52 my-3"
          />
          <input
            type="password"
            placeholder="Masukan Password"
            className="py-1 px-3 rounded-full w-52 "
          />
          <button className="w-52 p-2 my-3 bg-slate-500 rounded-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
