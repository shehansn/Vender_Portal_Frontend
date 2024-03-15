import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  favProductList:[]
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },setDataFavProduct: (state, action) => {
      state.favProductList = [...action.payload];
    }
  },
});


export const {
  setDataProduct,
  setDataFavProduct
} = productSlice.actions;

export default productSlice.reducer;
