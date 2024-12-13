import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { use } from "react";
import { fetchProducts } from "../redux/slice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products);
  console.log(product);
  const productDetail = product.find((item) => item.id == id);
  console.log(productDetail);
  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, []);

  const navigate = useNavigate();
  const addToCart = () => {
    navigate("Cart");
  };
  return (
    <>
      <div className="container pt-20">
        <div className=" h-full px-24 py-10 mx-auto gap-10 flex">
          <img src={productDetail?.image} alt="" className="w-96 h-96" />
          <div className="w-1/2 mx-auto mt-14 px-3 rounded-lg ">
            <p className="font-bold text-3xl">{productDetail?.title}</p>
            <p className="my-3 font-semibold">${productDetail?.price}</p>
            <input
              type="text"
              placeholder="1"
              className="w-10 h-10 mr-5 text-center font-bold text-black border-2 border-black"
            />
            <button
              onClick={() => addToCart()}
              className="bg-green-500 p-3 font-bold my-5 rounded-md shadow-lg shadow-slate-500"
            >
              Add to Cart
            </button>
            <h2 className="mt-4 font-bold text-2xl">Product Detail</h2>
            <p className="w-3/4 font-thin">{productDetail?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
