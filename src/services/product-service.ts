import api from "@/lib/api";
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
  ProductShareResponse,
} from "@/types/product";

interface GetProductsHeaders {
  [key: string]: string;
}

interface GetProductsOptions {
  headers?: GetProductsHeaders;
}

const getProducts = async (
  filters: ProductFilters = {},
  extraHeaders: GetProductsHeaders = {}
): Promise<ProductListResponse> => {
  const params = new URLSearchParams();

  // Add filters to params if they exist
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const response = await api.get(`products/?${params.toString()}`, {
    headers: {
      ...extraHeaders,
    },
  });
  console.log(response.headers);
  return response.data;
};

const productService = {
  // ==================== BASE ENDPOINTS ====================

  // List Products with filters and pagination
  getProducts,

  // Get single product by ID
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get(`products/${id}/`);
    return response.data;
  },

  // Create new product (SELLER only)
  createProduct: async (data: ProductCreate): Promise<Product> => {
    const response = await api.post("products/", data);
    return response.status === 201 ? response.data : Promise.reject(response.data);
  },

  // Update existing product (SELLER only)
  updateProduct: async (id: string, data: ProductUpdate): Promise<Product> => {
    const response = await api.put(`products/${id}/`, data);
    return response.data;
  },

  // Partial update product (SELLER only)
  patchProduct: async (id: string, data: Partial<ProductUpdate>): Promise<Product> => {
    const response = await api.patch(`products/${id}/`, data);
    return response.data;
  },

  // ==================== SELLER-SPECIFIC ENDPOINTS ====================

  // Get current seller's products
  getMyProducts: async (filters: ProductFilters = {}): Promise<ProductListResponse> => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    const response = await api.get(`products/my-products/?${params.toString()}`);
    return response.data;
  },

  // Get comprehensive product statistics
  getProductStats: async (): Promise<ProductStats> => {
    const response = await api.get("products/stats/");
    return response.data;
  },

  // Toggle product active status
  toggleProductStatus: async (id: string): Promise<Product> => {
    const response = await api.post(`products/${id}/toggle-active/`);
    return response.data;
  },

  // Toggle product featured status
  toggleFeaturedStatus: async (id: string): Promise<Product> => {
    const response = await api.post(`products/${id}/toggle-featured/`);
    return response.data;
  },

  // ==================== INVENTORY MANAGEMENT ====================

  // Add inventory to product
  addInventory: async (id: string, data: InventoryAction): Promise<Product> => {
    const response = await api.post(`products/${id}/add-inventory/`, data);
    return response.data;
  },

  // Activate inventory (move from total to available)
  activateInventory: async (id: string, data: InventoryAction): Promise<Product> => {
    const response = await api.post(`products/${id}/activate-inventory/`, data);
    return response.data;
  },

  // Place inventory in escrow (BUYER only)
  placeInEscrow: async (id: string, data: InventoryAction): Promise<Product> => {
    const response = await api.post(`products/${id}/place-in-escrow/`, data);
    return response.data;
  },

  // Release inventory from escrow (SELLER only)
  releaseFromEscrow: async (id: string, data: InventoryAction): Promise<Product> => {
    const response = await api.post(`products/${id}/release-from-escrow/`, data);
    return response.data;
  },

  // ==================== PRICE NEGOTIATION ====================

  // Initiate price negotiation (BUYER only)
  initiateNegotiation: async (
    id: string,
    data: InitiateNegotiationParams
  ): Promise<PriceNegotiation> => {
    const response = await api.post(`products/${id}/initiate-negotiation/`, data);
    return response.data;
  },

  // Respond to price negotiation (SELLER only)
  respondToNegotiation: async (
    negotiationId: string,
    data: RespondToNegotiationParams
  ): Promise<PriceNegotiation> => {
    const response = await api.post(`products/respond-to-negotiation/${negotiationId}/`, data);
    return response.data;
  },

  // Create transaction from successful negotiation (BUYER only)
  createTransactionFromNegotiation: async (
    negotiationId: string,
    data: CreateTransactionParams
  ): Promise<any> => {
    const response = await api.post(`products/create-transaction/${negotiationId}/`, data);
    return response.data;
  },

  // ==================== SOCIAL SHARING ====================

  // Get share links for a product
  getShareLinks: async (shortCode: string): Promise<ShareLinks> => {
    const response = await api.get(`products/share-links/${shortCode}/`);
    return response.data;
  },

  // Get product by short code (public endpoint)
  getProductByShortCode: async (shortCode: string): Promise<Product> => {
    const response = await api.get(`products/by-shortcode/${shortCode}/`);
    return response.data;
  },

  // ==================== FEATURED PRODUCTS ====================

  // Get featured products
  getFeaturedProducts: async (filters: ProductFilters = {}): Promise<ProductListResponse> => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    const response = await api.get(`products/featured/?${params.toString()}`);
    return response.data;
  },

  // ==================== UTILITY METHODS ====================

  // Delete product (if supported by backend)
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`products/${id}/`);
  },

  // Bulk operations (if needed)
  bulkUpdateProducts: async (
    products: Array<{ id: string; data: ProductUpdate }>
  ): Promise<Product[]> => {
    const promises = products.map(({ id, data }) => productService.updateProduct(id, data));
    return Promise.all(promises);
  },

  // Search products with advanced filters
  searchProducts: async (
    query: string,
    filters: ProductFilters = {}
  ): Promise<ProductListResponse> => {
    return productService.getProducts({ ...filters, search: query });
  },

  // Get products by category
  getProductsByCategory: async (
    categoryName: string,
    filters: ProductFilters = {}
  ): Promise<ProductListResponse> => {
    return productService.getProducts({ ...filters, category_name: categoryName });
  },

  // Get products by price range
  getProductsByPriceRange: async (
    minPrice: number,
    maxPrice: number,
    filters: ProductFilters = {}
  ): Promise<ProductListResponse> => {
    return productService.getProducts({
      ...filters,
      min_price: minPrice,
      max_price: maxPrice,
    });
  },

  // Get discounted products
  getDiscountedProducts: async (
    minDiscountPercentage?: number,
    filters: ProductFilters = {}
  ): Promise<ProductListResponse> => {
    return productService.getProducts({
      ...filters,
      has_discount: true,
      min_discount_percentage: minDiscountPercentage,
    });
  },
};

export default productService;
