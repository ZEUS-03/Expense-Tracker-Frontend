import { configureStore } from "@reduxjs/toolkit";
import authRedudcer from "./slices/authSlice";
import transactionReducer from "./slices/transactionSlice";

const store = configureStore({
  reducer: {
    auth: authRedudcer,
    transactions: transactionReducer,
  },
});
console.log(store.dispatch, "store dispatch");
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
