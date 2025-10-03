import { authService } from "./services/auth";
import { logout } from "./store/slices/authSlice";
import { format } from "date-fns";

export const googleOAuth = async () => {
  try {
    const response = await authService.getGoogleAuthUrl();
    const { authUrl } = response.data;
    window.location.href = authUrl;
  } catch (error) {
    console.log(error);
  }
};

export const routeUserToHome = (error, dispatch) => {
  if (error.response && error.response.status === 401) {
    dispatch(logout());
    window.location.href = "/";
  }
};

export function getPastMonths(count: number): string[] {
  const months = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(format(d, "MMM yyyy"));
  }
  return months;
}

export function getThisWeekRange() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)

  const start = new Date(today);
  start.setDate(today.getDate() - dayOfWeek); // Sunday

  const end = new Date(start);
  end.setDate(start.getDate() + 6); // Saturday

  return { startDate: start, endDate: end };
}

export function getThisMonthRange() {
  const today = new Date();

  const start = new Date(today.getFullYear(), today.getMonth(), 1); // 1st of the month
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0); // last day of the month

  return { startDate: start, endDate: end };
}

export function getThisQuarterRange() {
  const today = new Date();
  const currentMonth = today.getMonth(); // 0 = Jan, 11 = Dec

  const quarterStartMonth = Math.floor(currentMonth / 3) * 3;

  const start = new Date(today.getFullYear(), quarterStartMonth, 1);
  const end = new Date(today.getFullYear(), quarterStartMonth + 3, 0); // last day of the quarter

  return { startDate: start, endDate: end };
}
