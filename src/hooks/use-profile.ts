"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user-service"; // You'll need to create this service
import type { UserPublicProfile, UserStore, UserRating, UserAddress } from "@/types/user"; // You'll need to define these types

// -------------------- USER PROFILE HOOKS --------------------

// Get current user's full profile
export function useCurrentUserProfile() {
  return useQuery({
    queryKey: ["userProfile", "me"],
    queryFn: async () => {
      return await userService.getCurrentUserProfile();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Get public profile of any user
export function useUserProfile(userId: string | number) {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      return await userService.getUserProfile(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// -------------------- STORE HOOKS --------------------

// List stores (filtered by permissions)
export function useStores() {
  return useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      return await userService.listStores();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Create store mutation
export function useCreateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserStore) => userService.createStore(data),
    onSuccess: () => {
      // Invalidate the stores list query to refetch with new store
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
}

// Get single store
export function useStore(storeId: string | number) {
  return useQuery({
    queryKey: ["store", storeId],
    queryFn: async () => {
      return await userService.getStore(storeId);
    },
    enabled: !!storeId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Update store mutation
export function useUpdateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: Partial<UserStore> }) =>
      userService.updateStore(id, data),
    onSuccess: (updatedStore: UserStore, { id }) => {
      // Update single store data in cache
      queryClient.setQueryData(["store", id], updatedStore);

      // Invalidate the stores list query to refetch with updated store
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
}

// -------------------- RATING HOOKS --------------------

// List ratings (given/received)
export function useRatings(params?: { given?: boolean; received?: boolean }) {
  return useQuery({
    queryKey: ["ratings", params],
    queryFn: async () => {
      return await userService.listRatings(params);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Create rating mutation
export function useCreateRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserRating) => userService.createRating(data),
    onSuccess: () => {
      // Invalidate the ratings list query to refetch with new rating
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
  });
}

// Get single rating
export function useRating(ratingId: string | number) {
  return useQuery({
    queryKey: ["rating", ratingId],
    queryFn: async () => {
      return await userService.getRating(ratingId);
    },
    enabled: !!ratingId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Update rating mutation
export function useUpdateRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: Partial<UserRating> }) =>
      userService.updateRating(id, data),
    onSuccess: (updatedRating: UserRating, { id }) => {
      // Update single rating data in cache
      queryClient.setQueryData(["rating", id], updatedRating);

      // Invalidate the ratings list query to refetch with updated rating
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
    },
  });
}

// -------------------- ADDRESS HOOKS --------------------

// List user's addresses
export function useAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      return await userService.listAddresses();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Create address mutation
export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserAddress) => userService.createAddress(data),
    onSuccess: () => {
      // Invalidate the addresses list query to refetch with new address
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}

// Get single address
export function useAddress(addressId: string | number) {
  return useQuery({
    queryKey: ["address", addressId],
    queryFn: async () => {
      return await userService.getAddress(addressId);
    },
    enabled: !!addressId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Update address mutation
export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: Partial<UserAddress> }) =>
      userService.updateAddress(id, data),
    onSuccess: (updatedAddress: UserAddress, { id }) => {
      // Update single address data in cache
      queryClient.setQueryData(["address", id], updatedAddress);

      // Invalidate the addresses list query to refetch with updated address
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}

// Set default address mutation
export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string | number) =>
      userService.updateAddress(addressId, { is_default: true }),
    onSuccess: () => {
      // Invalidate addresses to refetch with the new default
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}

// Delete address mutation
export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string | number) => userService.deleteAddress(addressId),
    onSuccess: (_data, addressId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: ["address", addressId] });

      // Invalidate addresses list
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
}
