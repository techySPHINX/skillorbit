import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSkills, addSkill as apiAddSkill, deleteSkill as apiDeleteSkill, type Skill, type AddSkillData } from "../api/skill";

export const getSkills = createAsyncThunk("skills/getSkills", async () => {
  const res = await fetchSkills();
  return res.skills;
});

export const addSkill = createAsyncThunk("skills/addSkill", async (skillData: AddSkillData) => {
  const res = await apiAddSkill(skillData);
  return res.skill;
});

export const deleteSkill = createAsyncThunk("skills/deleteSkill", async (id: string) => {
  await apiDeleteSkill(id);
  return id;
});

interface SkillState {
  skills: Skill[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillState = {
  skills: [],
  loading: false,
  error: null,
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
        state.loading = false;
      })
      .addCase(getSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch skills";
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((skill) => skill._id !== action.payload);
      });
  },
});

export default skillSlice.reducer;
