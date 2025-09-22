import { api, protectedApi } from "./api";

export const authService = {
  getGoogleAuthUrl: () => api.get(import.meta.env.VITE_API_AUTH_URL),
  getSelfDetails: () => protectedApi.get(import.meta.env.VITE_API_GET_USER_URL),
  getGoogleAuthCode: (code: string) => api.post("/auth/google/code", { code }),
};
