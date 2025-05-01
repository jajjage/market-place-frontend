// Redux Toolkit slice for authentication

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import userService from "@/services/auth-service";
import { User, UserCreate } from "@/types/user";
import { AuthState } from "@/types/auth.types";
import { isSuccessStatus } from "@/lib/helper/google-auth";

// Async thunks for authentication operations
export const register = createAsyncThunk<User, UserCreate>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const user = await userService.register(userData);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const login = createAsyncThunk<User, any>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // Login using your service
      console.log(credentials);
      const user = await userService.userLogin(credentials);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const getCurrentUser = createAsyncThunk<User, void>(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      // Your service already handles auth headers via cookies
      const user = await userService.getCurrentUser();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const updatedUser = await userService.updateCurrentUser(userData);
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to update user");
    }
  }
);

// Google authentication thunk
export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (
    {
      state,
      code,
      user_type,
    }: {
      state: string;
      code: string;
      user_type?: "BUYER" | "SELLER";
    },
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const response = await userService.googleAuth(state, code, user_type);
      console.log("Google Auth Response:", response);

      // Accept any successful status code (2xx)
      if (isSuccessStatus(response.status)) {
        // Return the complete response data including user_type for routing decisions
        return response.data;
      } else {
        console.warn(`Unexpected response status: ${response.status}`);
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      console.error("Google authentication error:", error);

      // Provide more detailed error information for debugging
      const errorDetails = {
        message: error.message || "Google authentication failed",
        responseData: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      };

      return rejectWithValue(errorDetails);
    }
  }
);

// Update user role after authentication
export const updateUserRole = createAsyncThunk(
  "auth/updateUserRole",
  async (role: "BUYER" | "SELLER", { rejectWithValue }) => {
    try {
      console.log(`Updating user role to: ${role}`);

      // Use your existing updateUser function
      const updatedUser = await userService.updateCurrentUser({
        user_type: role,
      });

      console.log("User role updated:", updatedUser);

      return updatedUser;
    } catch (error: any) {
      console.error("Error updating user role:", error);
      return rejectWithValue(error.response?.data || "Failed to update user role");
    }
  }
);

const initialState: AuthState = {
  user: null,
  status: "idle",
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      userService.logout();
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
        // Registration doesn't log the user in typically
        // The user needs to activate their account or login separately
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Login cases
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.user = action.payload;
        //
        // We'll set isAuthenticated when getCurrentUser succeeds
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = "failed";
        //
      })

      // Get current user cases
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        // We've checked auth and know user is logged in
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = (action.payload as string) || "Failed to get current user";
        // We've checked auth and know user is not logged in
      })

      // Update user cases
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(googleAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      // Google Auth cases
      .addCase(googleAuth.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
      })

      .addCase(updateUserRole.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;
