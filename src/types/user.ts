export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: "BUYER" | "SELLER";
  verification_status?: "VERIFIED" | string;
  
  // Optional profile object that appears in some responses
  profile?: {
    id: string;
    bio?: string;
    address?: Record<string, any>; // Using generic Record since address structure isn't clear
    profile_picture?: string;
    phone_number?: string;
    rating?: string;
    total_reviews?: number;
    is_featured?: boolean;
    social_links?: Record<string, any>;
  };
}

export interface UserLogin {
  email: string;
  password: string;
  
}

export interface UserCreate {
  email: string;
  first_name: string;
  last_name: string;
  user_type: "BUYER" | "SELLER";
  password: string;
  re_password: string;
}


export type UserUpdate = Partial<Pick<User, 'email' | 'first_name' | 'last_name' | 'user_type' | 'profile'>>

export interface ActivateUserParams {
  uid: string;
  token: string;
}


export interface SetPasswordParams {
  re_new_password: string;
  new_password: string;
  current_password: string;
}

/**
 * Payload for initiating password reset via `/auth/users/reset_password/`.
 */
export interface ResetPasswordParams {
  email: string;
}

/**
 * Payload for confirming password reset via `/auth/users/reset_password_confirm/`.
 */
export interface ResetPasswordConfirmParams {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

