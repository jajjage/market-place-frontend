import { User } from "@/types/user";

// Initial state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  lastChecked: number | null;
}

export interface userState {
  state: string;
  code: string;
}

export type UserType = "BUYER" | "SELLER";