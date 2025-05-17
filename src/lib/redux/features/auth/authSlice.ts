import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "@/types/auth.types";
import { User } from "@/types/user";


const initialState: AuthState = {
  user: null,
  isAuthenticated: typeof window !== 'undefined' ? localStorage.getItem("isAuthenticated") === "true" : false,
  isLoading: false,
  lastChecked: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user information and authentication state
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
      state.lastChecked = Date.now();
    },

    // Set loading state
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Clear authentication state on logout
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.lastChecked = Date.now();
    },

    // Update specific user fields without replacing the entire user object
    updateUserField: (state, action: PayloadAction<{ field: string; value: any }>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          [action.payload.field]: action.payload.value,
        };
      }
    },
  },
});

export const { setUser, setAuthLoading, clearAuth, updateUserField } = authSlice.actions;
export default authSlice.reducer;
