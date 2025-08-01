
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Swap } from '../models/swap'; // Assuming you have a Swap model

interface SwapState {
  swaps: Swap[];
}

const initialState: SwapState = {
  swaps: [],
};

const swapSlice = createSlice({
  name: 'swap',
  initialState,
  reducers: {
    setSwaps: (state, action: PayloadAction<Swap[]>) => {
      state.swaps = action.payload;
    },
    addOrUpdateSwap: (state, action: PayloadAction<Swap>) => {
      const index = state.swaps.findIndex(swap => swap._id === action.payload._id);
      if (index !== -1) {
        state.swaps[index] = action.payload;
      } else {
        state.swaps.unshift(action.payload); // Add new swap to the beginning
      }
    },
  },
});

export const { setSwaps, addOrUpdateSwap } = swapSlice.actions;
export default swapSlice.reducer;
