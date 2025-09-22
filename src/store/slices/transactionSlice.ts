import { transactionService } from "@/services/transaction";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionState {
  transactions: object[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

export const syncTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionService.syncTransactions({
        maxResults: 50,
        syncAll: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get transactions"
      );
    }
  }
);

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<object[]>) => {
      state.transactions = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getTransactions
      .addCase(syncTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(syncTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTransactions, setLoading, setError } =
  transactionSlice.actions;
export default transactionSlice.reducer;
