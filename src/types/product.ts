// Product Types
export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  compare_price?: number;
  currency: string;
  categories: string[];
  images?: any;
  specifications?: any;
  inventory_count: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  seller: {
    id: string;
    first_name: string;
    full_name: string;
    is_verified: boolean;
    avatar: string | null;
    average_rating: number | null;
    total_ratings: number;
  };
  category_names?: string[];
  discount_percentage?: number;
  has_discount: boolean;
  short_code: string;
  view_count?: number;
  share_count?: number;
}

export interface ProductCreate {
  title: string;
  description?: string;
  price: number;
  compare_price?: number;
  currency: string;
  categories: string[];
  images?: any;
  specifications?: any;
  inventory_count: number;
}

export interface ProductUpdate extends Partial<ProductCreate> {}

export interface ProductFilters {
  min_price?: number;
  max_price?: number;
  has_discount?: boolean;
  min_discount_percentage?: number;
  created_after?: string;
  created_before?: string;
  title_contains?: string;
  description_contains?: string;
  seller_email?: string;
  category_name?: string;
  specification_value?: string;
  search?: string;
  status?: string;
  ordering?:
    | "price"
    | "-price"
    | "created_at"
    | "-created_at"
    | "title"
    | "-title"
    | "inventory_count"
    | "-inventory_count";
  page?: number;
  page_size?: number;
}

export interface ProductListResponse {
  count: number;
  status?: string;
  status_code?: number;
  data: Product[];
  next?: string;
  previous?: string;
}

export interface ProductStats {
  total_products: number;
  active_products: number;
  featured_products: number;
  inventory_stats: {
    total_inventory: number;
    available_inventory: number;
    escrow_inventory: number;
  };
  category_distribution: Array<{
    category: string;
    count: number;
  }>;
  discount_stats: {
    products_with_discount: number;
    average_discount_percentage: number;
  };
  monthly_trends: Array<{
    month: string;
    products_created: number;
    total_sales: number;
  }>;
}

export interface InventoryAction {
  quantity: number;
  notes?: string;
}

export interface PriceNegotiation {
  negotiation_id: string;
  product: {
    id: string;
    name: string;
    original_price: number;
  };
  offered_price: number;
  status: "pending" | "accepted" | "rejected" | "countered";
  seller: string;
  buyer: string;
  created_at: string;
  updated_at: string;
}

export interface InitiateNegotiationParams {
  offered_price: number;
}

export interface RespondToNegotiationParams {
  response_type: "accept" | "reject" | "counter";
  counter_price?: number;
}

export interface CreateTransactionParams {
  quantity: number;
  notes?: string;
}

export interface ShareLinks {
  facebook: string;
  twitter: string;
  whatsapp: string;
  linkedin: string;
  telegram: string;
}

export interface ProductShareResponse {
  share_links: ShareLinks;
  product: Product;
}
