import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  cart: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let existingCart = state.cart.find(
        (product) => product.id === action.payload.id
      );

      if (existingCart) {
        existingCart.quantity += action.payload.quantity;
        state.cart = state.cart.map((product) => {
          if (product.id === existingCart.id) {
            return existingCart;
          }
          return product;
        });
      } else {
        const selectedProduct = state.products.find(
          (product) => product.id === action.payload.id
        );
        state.cart.push({
          ...selectedProduct,
          quantity: action.payload.quantity,
        });
      }
    },

    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((cart) => cart.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.id !== action.payload
      );
    },

    checkOut: (state, action) => {
      state.products = state.products.map((product) => {
        const existingCart = state.cart.find((cart) => cart.id === product.id);
        if (existingCart) {
          product.stock -= existingCart.quantity;
        }
        return product;
      });
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log(state.products);
      state.products = action.payload.map((product) => {
        return {
          ...product,
          stock: 20,
        };
      });
    });
  },
});

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);
export const { addToCart, checkOut, updateCartQuantity, removeFromCart } =
  productSlice.actions;
export default productSlice.reducer;
