import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "@/services/product-service";
import type {
  Product,
  ProductCreate,
  ProductUpdate,
  ProductFilters,
  ProductListResponse,
  ProductStats,
  InventoryAction,
  InitiateNegotiationParams,
  RespondToNegotiationParams,
  CreateTransactionParams,
  PriceNegotiation,
  ShareLinks,
} from "@/types/product";

// Query Keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  myProducts: () => [...productKeys.all, "my-products"] as const,
  myProductsList: (filters: ProductFilters) => [...productKeys.myProducts(), filters] as const,
  stats: () => [...productKeys.all, "stats"] as const,
  featured: () => [...productKeys.all, "featured"] as const,
  featuredList: (filters: ProductFilters) => [...productKeys.featured(), filters] as const,
  shareLinks: (shortCode: string) => [...productKeys.all, "share-links", shortCode] as const,
  byShortCode: (shortCode: string) => [...productKeys.all, "by-shortcode", shortCode] as const,
};

// ==================== QUERIES ====================

// List Products
export const useProducts = (
  filters: ProductFilters = {},
  options?: {
    initialData?: ProductListResponse;
    enabled?: boolean;
  }
) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialData: options?.initialData,
    enabled: options?.enabled !== false,
  });
};

// Get Single Product
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// My Products (Seller)
export const useMyProducts = (filters: ProductFilters = {}) => {
  return useQuery({
    queryKey: productKeys.myProductsList(filters),
    queryFn: () => productService.getMyProducts(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Product Statistics (Seller)
export const useProductStats = () => {
  return useQuery({
    queryKey: productKeys.stats(),
    queryFn: () => productService.getProductStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Featured Products
export const useFeaturedProducts = (filters: ProductFilters = {}) => {
  return useQuery({
    queryKey: productKeys.featuredList(filters),
    queryFn: () => productService.getFeaturedProducts(filters),
    staleTime: 5 * 60 * 1000,
  });
};

// Share Links
export const useShareLinks = (shortCode: string) => {
  return useQuery({
    queryKey: productKeys.shareLinks(shortCode),
    queryFn: () => productService.getShareLinks(shortCode),
    enabled: !!shortCode,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Product by Short Code
export const useProductByShortCode = (shortCode: string) => {
  return useQuery({
    queryKey: productKeys.byShortCode(shortCode),
    queryFn: () => productService.getProductByShortCode(shortCode),
    enabled: !!shortCode,
    staleTime: 5 * 60 * 1000,
  });
};

// ==================== MUTATIONS ====================

// Create Product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductCreate) => productService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.myProducts() });
      queryClient.invalidateQueries({ queryKey: productKeys.stats() });
    },
  });
};

// Update Product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductUpdate }) =>
      productService.updateProduct(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.myProducts() });
    },
  });
};

// Toggle Product Status
export const useToggleProductStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.toggleProductStatus(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.myProducts() });
      queryClient.invalidateQueries({ queryKey: productKeys.stats() });
    },
  });
};

// Toggle Featured Status
export const useToggleFeaturedStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.toggleFeaturedStatus(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.myProducts() });
      queryClient.invalidateQueries({ queryKey: productKeys.featured() });
      queryClient.invalidateQueries({ queryKey: productKeys.stats() });
    },
  });
};

// Add Inventory
export const useAddInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InventoryAction }) =>
      productService.addInventory(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.myProducts() });
      queryClient.invalidateQueries({ queryKey: productKeys.stats() });
    },
  });
};

// Activate Inventory
export const useActivateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InventoryAction }) =>
      productService.activateInventory(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.myProducts() });
      queryClient.invalidateQueries({ queryKey: productKeys.stats() });
    },
  });
};

// Place in Escrow
export const usePlaceInEscrow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InventoryAction }) =>
      productService.placeInEscrow(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
  });
};

// Release from Escrow
export const useReleaseFromEscrow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InventoryAction }) =>
      productService.releaseFromEscrow(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: productKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.myProducts() });
      queryClient.invalidateQueries({ queryKey: productKeys.stats() });
    },
  });
};

// Initiate Price Negotiation
export const useInitiateNegotiation = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: InitiateNegotiationParams }) =>
      productService.initiateNegotiation(id, data),
  });
};

// Respond to Negotiation
export const useRespondToNegotiation = () => {
  return useMutation({
    mutationFn: ({
      negotiationId,
      data,
    }: {
      negotiationId: string;
      data: RespondToNegotiationParams;
    }) => productService.respondToNegotiation(negotiationId, data),
  });
};

// Create Transaction from Negotiation
export const useCreateTransactionFromNegotiation = () => {
  return useMutation({
    mutationFn: ({
      negotiationId,
      data,
    }: {
      negotiationId: string;
      data: CreateTransactionParams;
    }) => productService.createTransactionFromNegotiation(negotiationId, data),
  });
};
