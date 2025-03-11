import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "./features/customerSlice";
import productsReducer from "./features/productSlice";
import ordersReducer from "./features/orderSlice";

export const store = configureStore({
  reducer: {
    customers: customersReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});
