export type DisputeReason =
  | "not_as_described"
  | "not_received"
  | "damaged"
  | "wrong_item"
  | "other";

export type DisputeStatus =
  | "opened"
  | "in_review"
  | "resolved_buyer"
  | "resolved_seller"
  | "closed";

export interface EscrowTransaction {
  id: number;
  // Add other fields relevant to EscrowTransaction if needed
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Dispute {
  id: number;
  transaction: EscrowTransaction;
  opened_by: User;
  reason: DisputeReason;
  description: string;
  status: DisputeStatus;
  created_at: string; // ISO format date string
  updated_at: string; // ISO format date string
}

export type EscrowStatus =
  | "initiated"
  | "payment_received"
  | "shipped"
  | "delivered"
  | "inspection"
  | "disputed"
  | "completed"
  | "refunded"
  | "cancelled"
  | "funds_released";

export interface Product {
  id: number;
  // Include other fields as needed
}

export interface EscrowTransaction {
  id: number;
  product: Product;
  buyer: User;
  seller: User;
  amount: string; // Use string for decimal values to avoid precision issues
  currency: string; // typically "USD" or other ISO currency codes

  status: EscrowStatus;

  tracking_id: string;
  tracking_number?: string | null;
  shipping_carrier?: string | null;
  shipping_address?: string | null;

  inspection_period_days: number;
  inspection_end_date?: string | null; // ISO timestamp

  price_by_negotiation?: string | null;

  status_changed_at: string; // ISO timestamp
  is_auto_transition_scheduled: boolean;
  auto_transition_type?: string | null;
  next_auto_transition_at?: string | null;

  notes?: string;

  created_at: string; // inherited from BaseModel
  updated_at: string; // inherited from BaseModel

  // Optional derived values if your frontend needs them
  is_final_status?: boolean;
  days_in_current_status?: number;
  time_until_auto_transition?: string | null;
}
