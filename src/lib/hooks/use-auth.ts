"use client"; // Important! Mark as Client Component

import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import {
  register,
  login,
  getCurrentUser,
  updateUser,
  logout,
  clearError,
  googleAuth,
  updateUserRole,
} from "@/lib/redux/features/auth/authSlice";
import { UserCreate } from "@/types/user";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  return {
    ...auth,
    register: (userData: UserCreate) => dispatch(register(userData)),
    login: (credentials: any) => dispatch(login(credentials)),
    getCurrentUser: () => dispatch(getCurrentUser()),
    updateUser: (userData: any) => dispatch(updateUser(userData)),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
    googleAuth: (state: string, code: string, user_type?: "BUYER" | "SELLER") =>
      dispatch(googleAuth({ state, code, user_type })),
    updateUserRole: (role: "BUYER" | "SELLER") => dispatch(updateUserRole(role)),
  };
};
