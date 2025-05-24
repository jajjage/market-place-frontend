import { Dispute, EscrowTransaction } from "./transaction";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: "SELLER" | "BUYER" | string;
  verification_status: "VERIFIED" | "UNVERIFIED" | string;
  profile: UserProfile;
  store: UserStore | null;
  addresses: UserAddress[];
  received_ratings: UserRating[];
  disputes: Dispute[];
  sales: EscrowTransaction[];
  purchases: EscrowTransaction[];
  avatar_url: string | null;
}

export interface UserProfile {
  id: string;
  display_name: string;
  bio?: string;
  email_verified?: boolean;
  phone_verified?: boolean;
  identity_verified?: boolean;
  phone_number?: string;
  country?: string;
  city?: string;
  member_since?: string; // ISO date string
  last_active?: string; // ISO date string
  transactions_completed?: number;
  notification_email?: boolean;
  notification_sms?: boolean;
  total_sales: number;
  total_purchases: number;
  verified_status: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface UserStore {
  id: string;
  user: string; // User ID reference
  name: string;
  slug: string;
  logo: string | null;
  banner: string | null;
  description: string;
  return_policy: string;
  shipping_policy: string;
  website: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface UserAddress {
  id: string;
  user: string; // User ID reference
  address_type: "shipping" | "billing" | "both";
  is_default: boolean;
  name: string;
  street_address: string;
  apartment: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface UserRating {
  id: string;
  transaction: string; // Transaction ID reference
  from_user: string; // User ID reference
  to_user: string; // User ID reference
  rating: number; // 1-5
  comment: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface UserPublicProfile {
  id: string;
  display_name: string;
  profile_picture: string | null;
  bio: string;
  country: string;
  city: string;
  member_since: string; // ISO date string
  verified_status: string;
  total_sales: number;
  total_purchases: number;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserCreate {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  re_password: string;
}

export type UserUpdate = Partial<
  Pick<User, "email" | "first_name" | "last_name" | "user_type" | "profile">
>;

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

export interface ProfileData {
  profile: {
    display_name?: string;
    bio?: string;
    phone_number?: string;
    country?: string;
    city?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
    identity_verified?: boolean;
  };
}
