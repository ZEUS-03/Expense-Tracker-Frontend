import { authService } from "./services/auth";

export const googleOAuth = async () => {
  try {
    const response = await authService.getGoogleAuthUrl();
    const { authUrl } = response.data;
    window.location.href = authUrl;
  } catch (error) {
    console.log(error);
  }
};
