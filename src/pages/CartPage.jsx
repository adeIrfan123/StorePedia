import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkOut, updateCartQuantity } from "../redux/slice";

function CartPage() {
  const carts = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();

  const quantityChange = (id, newQuantity) => {
    if (newQuantity === null) return "0";
    dispatch(updateCartQuantity({ id, quantity: newQuantity }));
  };

  return (
    <>
      <div className="container pt-20">
        <h1>cart</h1>
        <ul className="bg-slate-100/65 mx-40 my-10">
          {carts.map((cart) => (
            <li key={cart.id} className=" px-6 py-5 flex gap-4">
              <img src={cart.image} alt="" className="h-40" />
              <div className="">
                <h3 className="font-bold">{cart.title}</h3>
                <div className="flex gap-3 mt-4">
                  <input
                    type="number"
                    value={cart.quantity}
                    min="1"
                    onChange={(e) =>
                      quantityChange(cart.id, parseInt(e.target.value))
                    }
                    className="w-12 font-bold text-black text-center border-2 border-black"
                  />
                  <p className="font-bold">
                    Price: ${cart.price * cart.quantity}
                  </p>
                </div>
                <button
                  className="bg-green-400 p-2 my-5"
                  onClick={() => dispatch(checkOut())}
                >
                  Check Out
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CartPage;
