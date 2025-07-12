import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSkills } from "../api/skill";

export const getSkills = createAsyncThunk("skills/getSkills", async () => {
  const res = await fetchSkills();
  return res.data.skills;
});

const skillSlice = createSlice({
  name: "skills",
  initialState: { skills: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
        state.loading = false;
      })
      .addCase(getSkills.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default skillSlice.reducer;
