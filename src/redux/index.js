import { configureStore } from "@reduxjs/toolkit";
import productSlideReducer from "./productSlide";

export const store = configureStore({
  reducer: {
    product : productSlideReducer
    
  },
});
