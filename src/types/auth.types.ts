import { User } from "@/types/user";

// Initial state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface userState {
  state: string;
  code: string;
}
