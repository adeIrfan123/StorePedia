import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.products);
  const productDetail = product.find((item) => item.id == id);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [warning, setWarning] = useState("");

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > productDetail.stock) {
      setWarning(`Quantity Melebihi Stock (${productDetail.stock})`);
      setQuantity(productDetail.stock);
    } else if (newQuantity < 1) {
      setWarning("Quantity Tidak Boleh Kurang Dari 1");
      setQuantity("");
    } else {
      setWarning("");
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (productDetail && quantity > 0 && quantity <= productDetail.stock) {
      dispatch(addToCart({ id: productDetail.id, quantity }));
      navigate("/Cart");
    } else {
      setWarning("Masukan Quantity Yang Benar.");
    }
  };

  return (
    <>
      <div className="container pt-20 font-poppins">
        <div className="h-full px-4 py-10 mx-auto gap-10 lg:flex lg:px-24">
          <img src={productDetail?.image} alt="" className="w-96 h-96" />
          <div className="mt-8  lg:w-1/2 lg:mx-auto lg:mt-14 lg:px-3 lg:rounded-lg">
            <p className="font-bold text-3xl">{productDetail?.title}</p>
            <p className="my-3 font-semibold">${productDetail?.price}</p>
            <p className="my-3 font-semibold">Stock: {productDetail?.stock}</p>
            {warning && <p className="text-red-600">{warning}</p>}
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-10 h-10 mr-5 text-center font-bold text-black border-2 border-black"
            />
            <button
              onClick={handleAddToCart}
              className="bg-green-500 p-3 font-bold my-5 rounded-md shadow-lg shadow-slate-500"
            >
              Add to Cart
            </button>
            <h2 className="mt-4 font-bold text-2xl">Product Detail</h2>
            <p className="lg:w-3/4 font-light">{productDetail?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
