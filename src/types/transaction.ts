export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'mediator';
  avatarUrl?: string;
}

export interface TransactionParty {
  user: User;
  role: 'buyer' | 'seller' | 'mediator';
  hasApproved: boolean;
  approvedAt?: string;
}

export interface TransactionEvent {
  id: string;
  type: 'created' | 'funded' | 'approved' | 'rejected' | 'disputed' | 'completed';
  createdAt: string;
  userId: string;
  message: string;
  data?: Record<string, any>;
}

export interface Dispute {
  id: string;
  reason: string;
  createdAt: string;
  createdById: string;
  status: 'pending' | 'in_review' | 'resolved';
  evidence: Array<{
    id: string;
    fileUrl: string;
    fileType: string;
    fileName: string;
    uploadedAt: string;
  }>;
  resolution?: {
    outcome: string;
    resolvedAt: string;
    resolvedById: string;
  };
}

export interface Transaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  status: 'draft' | 'pending' | 'funded' | 'active' | 'disputed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  parties: TransactionParty[];
  events: TransactionEvent[];
  documents: Array<{
    id: string;
    title: string;
    fileUrl: string;
    uploadedAt: string;
    uploadedById: string;
  }>;
  terms: string;
  dispute?: Dispute;
}

export interface TransactionCreate {
  title: string;
  description: string;
  amount: number;
  currency: string;
  sellerId: string;
  terms: string;
  documents?: File[];
}