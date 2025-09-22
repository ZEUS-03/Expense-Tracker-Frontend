import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getSelfCall } from "@/store/slices/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectPath?: string;
}

const ProtectedRoute = ({
  children,
  fallback = <div>Loading...</div>,
  redirectPath = "/",
}: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated && !loading) {
        await dispatch(getSelfCall());
        setInitialCheckDone(true);
      }
    };
    checkAuth();
  }, [dispatch, isAuthenticated, loading]);

  if (!initialCheckDone || loading) {
    return fallback;
  }

  if (!user || !isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
