import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { getSelfCall } from "@/store/slices/authSlice";

const AuthBootstrap = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = async () => {
      dispatch(getSelfCall());
    };

    initAuth();
  }, []);

  return <>{children}</>;
};

export default AuthBootstrap;
