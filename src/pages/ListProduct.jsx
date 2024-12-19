import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slice";

function ListProduct() {
  let navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const productDetail = (id) => {
    navigate(`ProductDetail/${id}`);
  };
  const AddToCart = (product) => {
    navigate("Cart");
    dispatch(addToCart({ id: product.id, quantity: 1 }));
  };
  return (
    <div className=" py-20 font-poppins">
      <div className="container flex justify-center mx-auto">
        <div className="">
          <h1 className="mt-2 mb-4 font-bold text-3xl lg:mx-5">All Product</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className="cursor-pointer w-[330px] shadow-md shadow-slate-400 rounded-lg lg:w-72"
                >
                  <div onClick={() => productDetail(product.id)}>
                    <img
                      src={product.image}
                      alt=""
                      className=" h-72 w-full rounded-md lg:h-60"
                    />
                    <div className="px-3 pt-2 overflow-hidden">
                      <div className=" h-8 overflow-hidden">
                        <h3 className="text-xl">{product.title}</h3>
                      </div>
                      <p className="font-bold mb-2 -mt-[3px]">
                        {product.category}
                      </p>
                      <p className="font-bold text-lg">${product.price}</p>
                      <p className="font-bold">🌟 {product.rating.rate}</p>
                      <p>Stock :{product.stock}</p>
                    </div>
                  </div>
                  <div className="mx-5 mt-4 py-4 flex items-center gap-2">
                    <button
                      onClick={() => productDetail(product.id)}
                      className="bg-slate-400 px-4 py-1 font-semibold rounded-md shadow-md shadow-slate-800/85 active:[box-shadow:0_1px_0_black] active:translate-y-[1px] transition-all"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => AddToCart(product)}
                      className="px-2 py-1 bg-green-600 rounded-lg shadow-md shadow-slate-800/85 active:[box-shadow:0_1px_0_black] active:translate-y-[1px] transition-all"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
