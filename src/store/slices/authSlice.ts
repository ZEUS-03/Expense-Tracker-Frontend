import { authService } from "@/services/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: object | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const getSelfCall = createAsyncThunk(
  "auth/getSelfCall",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getSelfDetails();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get auth URL"
      );
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getGoogleAuthUrl
      .addCase(getSelfCall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSelfCall.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getSelfCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // Handle loginWithGoogle
    // .addCase(loginWithGoogle.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(loginWithGoogle.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.user = action.payload;
    //   state.isAuthenticated = true;
    // })
    // .addCase(loginWithGoogle.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // });
  },
});

export const { logout, setError } = authSlice.actions;
export default authSlice.reducer;
