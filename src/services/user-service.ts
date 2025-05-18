// File: src/services/user-service.ts
import api from "@/lib/api";
import type { UserPublicProfile, UserStore, UserRating, UserAddress } from "@/types/user";

// Define base API endpoints
const API_URLS = {
  profiles: "users/profiles",
  stores: "users/store",
  ratings: "users/ratings",
  addresses: "users/addresses",
};

interface ProfileUpdateData {
  display_name?: string;
  bio?: string;
  phone_number?: string;
  country?: string;
  city?: string;
  notification_email?: boolean;
  notification_sms?: boolean;
}

const userService = {
  // -------------------- USER PROFILE SERVICES --------------------

  // Get current user's full profile
  getCurrentUserProfile: async (): Promise<UserPublicProfile> => {
    const response = await api.get(`${API_URLS.profiles}/me/`);
    return response.data;
  },

  // Get public profile of any user by ID
  getUserProfile: async (userId: string | number): Promise<UserPublicProfile> => {
    const response = await api.get(`${API_URLS.profiles}/${userId}/`);
    return response.data;
  },

  // Update current user's profile
  updateProfile: async (data: ProfileUpdateData): Promise<UserPublicProfile> => {
    const response = await api.patch(`${API_URLS.profiles}/me/`, data);
    return response.data;
  },

  // Request email verification
  requestEmailVerification: async (): Promise<void> => {
    await api.post(`${API_URLS.profiles}/verify-email/`);
  },

  // Verify phone number
  verifyPhone: async (code: string): Promise<void> => {
    await api.post(`${API_URLS.profiles}/verify-phone/`, { code });
  },

  // Request phone verification code
  requestPhoneVerification: async (): Promise<void> => {
    await api.post(`${API_URLS.profiles}/request-phone-verification/`);
  },

  // Upload profile avatar
  uploadAvatar: async (file: File): Promise<UserPublicProfile> => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await api.post(`${API_URLS.profiles}/avatar/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // -------------------- STORE SERVICES --------------------

  // List all stores (filtered by permissions)
  listStores: async (): Promise<UserStore[]> => {
    const response = await api.get(API_URLS.stores);
    return response.data;
  },

  // Create a new store
  createStore: async (data: UserStore): Promise<UserStore> => {
    const response = await api.post(API_URLS.stores, data);
    return response.data;
  },

  // Get store by ID
  getStore: async (storeId: string | number): Promise<UserStore> => {
    const response = await api.get(`${API_URLS.stores}/${storeId}/`);
    return response.data;
  },

  // Update store by ID
  updateStore: async (storeId: string | number, data: Partial<UserStore>): Promise<UserStore> => {
    const response = await api.patch(`${API_URLS.stores}/${storeId}/`, data);
    return response.data;
  },

  // -------------------- RATING SERVICES --------------------

  // List ratings (given/received)
  listRatings: async (params?: { given?: boolean; received?: boolean }): Promise<UserRating[]> => {
    const response = await api.get(API_URLS.ratings, { params });
    return response.data;
  },

  // Create a new rating
  createRating: async (data: UserRating): Promise<UserRating> => {
    const response = await api.post(API_URLS.ratings, data);
    return response.data;
  },

  // Get rating by ID
  getRating: async (ratingId: string | number): Promise<UserRating> => {
    const response = await api.get(`${API_URLS.ratings}/${ratingId}/`);
    return response.data;
  },

  // Update rating by ID
  updateRating: async (
    ratingId: string | number,
    data: Partial<UserRating>
  ): Promise<UserRating> => {
    const response = await api.patch(`${API_URLS.ratings}/${ratingId}/`, data);
    return response.data;
  },

  // -------------------- ADDRESS SERVICES --------------------

  // List user's addresses
  listAddresses: async (): Promise<UserAddress[]> => {
    const response = await api.get(API_URLS.addresses);
    return response.data;
  },

  // Create a new address
  createAddress: async (data: UserAddress): Promise<UserAddress> => {
    const response = await api.post(API_URLS.addresses, data);
    return response.data;
  },

  // Get address by ID
  getAddress: async (addressId: string | number): Promise<UserAddress> => {
    const response = await api.get(`${API_URLS.addresses}/${addressId}/`);
    return response.data;
  },

  // Update address by ID
  updateAddress: async (
    addressId: string | number,
    data: Partial<UserAddress>
  ): Promise<UserAddress> => {
    const response = await api.patch(`${API_URLS.addresses}/${addressId}/`, data);
    return response.data;
  },

  // Delete address by ID
  deleteAddress: async (addressId: string | number): Promise<void> => {
    await api.delete(`${API_URLS.addresses}/${addressId}/`);
  },
};

export default userService;
