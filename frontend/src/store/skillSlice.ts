import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSkills, type Skill } from "../api/skill"; 

export const getSkills = createAsyncThunk("skills/getSkills", async () => {
  const res = await fetchSkills();
  return res.skills;
});

interface SkillState {
  skills: Skill[];
  loading: boolean;
}

const initialState: SkillState = {
  skills: [],
  loading: false,
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
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
