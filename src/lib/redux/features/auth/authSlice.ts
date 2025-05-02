import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "@/types/auth.types";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
  },
});

export const { setUser, setAuth } = authSlice.actions;
export default authSlice.reducer;
