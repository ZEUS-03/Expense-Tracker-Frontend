import { Middleware } from "redux";
import { logout } from "../slices/authSlice";

interface ErrorAction {
  error?: {
    status?: number;
  };
  type: string;
  payload?: { any };
}

export const errorMiddleware: Middleware = (storeAPI) => (next) => (action) => {
  console.log("Action received in middleware:", action);
  if ((action as ErrorAction).error?.status === 401) {
    storeAPI.dispatch(logout());
    window.location.href = "/";
  }

  return next(action);
};
