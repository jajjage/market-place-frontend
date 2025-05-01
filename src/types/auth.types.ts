import { User } from "@/types/user";

// Initial state
export interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface userState {
  state: string;
  code: string;
}
