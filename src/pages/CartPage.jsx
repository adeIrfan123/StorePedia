import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkOut, updateCartQuantity, removeFromCart } from "../redux/slice";

function CartPage() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.products.cart);
  const [warning, setWarning] = useState("");

  const calculateTotalPrice = () => {
    return carts.reduce((total, cart) => total + cart.price * cart.quantity, 0);
  };

  const quantityChange = (id, newQuantity, stock) => {
    if (newQuantity > stock) {
      setWarning(`Quantity Tidak Boleh Lebih Dari Stock (${stock})`);
    } else if (newQuantity < 1) {
      setWarning("Quantity Tidak Boleh Kurang Dari 1");
      dispatch(updateCartQuantity({ id, quantity: 1 }));
    } else {
      setWarning("");
      dispatch(updateCartQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const isCheckoutDisabled = carts.some((cart) => cart.stock === 0);

  return (
    <>
      <div className="container pt-20">
        <ul className="lg:mx-40 my-10">
          {carts.length > 0 ? (
            carts.map((cart) => (
              <li key={cart.id} className="px-6 py-5 flex gap-4">
                <img src={cart.image} alt="" className="h-40" />
                <div>
                  <h3 className="font-bold">{cart.title}</h3>
                  <p>Stock: {cart.stock}</p>
                  <div className="flex gap-3 mt-4 mb-2">
                    <input
                      type="number"
                      value={cart.quantity}
                      min="1"
                      max={cart.stock}
                      onChange={(e) =>
                        quantityChange(
                          cart.id,
                          parseInt(e.target.value, 10),
                          cart.stock
                        )
                      }
                      className="w-12 font-bold text-black text-center border-2 border-black"
                    />
                    <p className="font-bold">
                      Price: ${cart.price * cart.quantity}
                    </p>
                    <button
                      onClick={() => handleRemove(cart.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-red-500 font-bold">{warning}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center lg:py-10 font-bold text-3xl">
              Keranjang Kosong
            </p>
          )}
        </ul>
        {carts.length > 0 && (
          <div className="lg:w-[900px] mx-auto mb-10 flex gap-10 justify-end">
            <div className="text-right font-bold text-xl">
              Total Price: ${calculateTotalPrice().toFixed(2)}
            </div>

            <button
              className={`bg-green-400 p-2 font-semibold shadow-md shadow-slate-400 rounded-md 
              ${isCheckoutDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isCheckoutDisabled}
              onClick={() => {
                if (!isCheckoutDisabled) {
                  dispatch(checkOut());
                }
              }}
            >
              Check Out
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
