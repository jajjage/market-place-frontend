import api from "@/lib/api";

import type {
  User,
  UserCreate,
  UserUpdate,
  ActivateUserParams,
  SetPasswordParams,
  ResetPasswordParams,
  ResetPasswordConfirmParams,
  UserLogin,
} from "@/types/user";

const userService = {
  // 1. Register a new user
  register: async (data: UserCreate): Promise<User> => {
    const response = await api.post("auth/users/", data);
    return response.status === 201 ? response.data : Promise.reject(response.data);
  },

  // 1. Register a new user
  googleAuth: async (state: string, code: string, user_type?: string) => {
    let endpoint = `auth/o/google-oauth2/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`;
    // Add user_type if provided
    if (user_type) {
      endpoint += `&user_type=${encodeURIComponent(user_type)}`;
    }
    const response = await api.post(
      endpoint,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Google Auth Response:", response);
    return response;
  },

  // 2. Activate a newly registered user

  activate: async ({ uid, token }: ActivateUserParams): Promise<void> => {
    await api.post("auth/users/activation/", { uid, token });
  },

  // 3. Get the currently authenticated user
  //    (requires your CookieJWTAuthentication or Authorization header)
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get("auth/users/me/");
    return response.data;
  },
  // 4. Login a user
  userLogin: async (data: UserLogin): Promise<User> => {
    const response = await api.post("auth/login/", data);
    return response.data;
  },

  // 4. Update the current user’s profile
  updateCurrentUser: async (data: Partial<UserUpdate>): Promise<User> => {
    console.log(data);
    const response = await api.patch("auth/users/me/", data);
    return response.data;
  },

  // 5. Change password (user must be authenticated)
  //    Expects { current_password, new_password }
  setPassword: async (data: SetPasswordParams): Promise<void> => {
    await api.post("auth/users/set_password/", data);
  },

  // 6. Initiate password reset (sends email)
  //    Expects { email }
  resetPassword: async (data: ResetPasswordParams): Promise<void> => {
    await api.post("auth/users/reset_password/", data);
  },

  logout: async (): Promise<void> => {
    await api.post("auth/logout/");
  },

  // 7. Confirm password reset
  //    Expects { uid, token, new_password }
  resetPasswordConfirm: async ({
    uid,
    token,
    new_password,
    re_new_password,
  }: ResetPasswordConfirmParams): Promise<void> => {
    await api.post("auth/users/reset_password_confirm/", {
      uid,
      token,
      new_password,
      re_new_password,
    });
  },
};

export default userService;
