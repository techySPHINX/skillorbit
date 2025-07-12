import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMe, login, register } from "../api/auth";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const fetchUser = createAsyncThunk<User>(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await fetchMe();
      return res.data.user;
    } catch (err: unknown) {
      return thunkAPI.rejectWithValue(
        (err as any).response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    const res = await login(email, password);
    return res.data.user;
  } catch (err: unknown) {
    return thunkAPI.rejectWithValue(
      (err as any).response?.data?.message || "Login failed"
    );
  }
});

export const registerUser = createAsyncThunk<
  User,
  { username: string; email: string; password: string },
  { rejectValue: string }
>("auth/registerUser", async (data, thunkAPI) => {
  try {
    const res = await register(data);
    return res.data.user;
  } catch (err: unknown) {
    return thunkAPI.rejectWithValue(
      (err as any).response?.data?.message || "Registration failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null } as AuthState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
