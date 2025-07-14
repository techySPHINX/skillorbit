import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSwaps, type Swap } from "../api/swap"; 

export const getSwaps = createAsyncThunk("swaps/getSwaps", async () => {
  const res = await fetchSwaps();
  return res.swaps; 
});

interface SwapState {
  swaps: Swap[];
  loading: boolean;
}

const initialState: SwapState = {
  swaps: [],
  loading: false,
};

const swapSlice = createSlice({
  name: "swaps",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSwaps.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSwaps.fulfilled, (state, action) => {
        state.swaps = action.payload;
        state.loading = false;
      })
      .addCase(getSwaps.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default swapSlice.reducer;
