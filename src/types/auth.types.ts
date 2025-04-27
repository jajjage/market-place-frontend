import { User, UserLogin } from "@/types/user";

// Initial state
export interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  authChecked: boolean; // New flag to track if auth status has been checked
}

export interface userState {
  state: string;
  code: string;
}
