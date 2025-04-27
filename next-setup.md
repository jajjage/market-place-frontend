# Next.js Frontend Setup for Escrow Marketplace

## Project Structure

```
escrow-marketplace/
├── .github/                    # GitHub workflows and templates
├── .husky/                     # Git hooks for code quality
├── public/                     # Static assets
│   ├── favicon.ico
│   ├── logo.svg
│   └── images/
├── src/
│   ├── app/                    # App router pages and layouts
│   │   ├── (auth)/             # Auth group (login, signup, etc.)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/        # Dashboard group
│   │   │   ├── transactions/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   ├── disputes/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/                # API routes (if needed)
│   │   ├── error.tsx           # Global error handling
│   │   ├── layout.tsx          # Root layout 
│   │   ├── loading.tsx         # Loading state
│   │   └── page.tsx            # Homepage
│   ├── components/             # UI components
│   │   ├── ui/                 # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── forms/              # Form components
│   │   │   ├── create-escrow-form.tsx
│   │   │   └── ...
│   │   ├── layout/             # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── ...
│   │   └── features/           # Feature-specific components
│   │       ├── transactions/
│   │       │   ├── transaction-card.tsx
│   │       │   ├── transaction-timeline.tsx
│   │       │   └── ...
│   │       ├── dashboard/
│   │       └── ...
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-transactions.ts
│   │   └── ...
│   ├── lib/                    # Utility functions and libraries
│   │   ├── api.ts              # API client setup
│   │   ├── utils.ts
│   │   └── ...
│   ├── providers/              # Context providers
│   │   ├── auth-provider.tsx
│   │   ├── theme-provider.tsx
│   │   └── ...
│   ├── services/               # API service functions
│   │   ├── auth-service.ts
│   │   ├── transaction-service.ts
│   │   └── ...
│   ├── store/                  # State management (if using Redux/Zustand)
│   │   ├── slices/
│   │   ├── index.ts
│   │   └── ...
│   ├── styles/                 # Global styles
│   │   ├── globals.css
│   │   └── ...
│   └── types/                  # TypeScript type definitions
│       ├── api.ts
│       ├── transaction.ts
│       └── ...
├── .env.example                # Environment variables example
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── .prettierrc                 # Prettier configuration
├── jest.config.js              # Jest configuration for testing
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Setup Instructions

### 1. Initialize Project

```bash
npx create-next-app@latest escrow-marketplace --typescript --eslint --tailwind --app
cd escrow-marketplace
```

### 2. Install Core Dependencies

```bash
# UI and styling
npm install @headlessui/react @heroicons/react class-variance-authority clsx tailwind-merge
npm install framer-motion

# Forms and validation
npm install react-hook-form zod @hookform/resolvers

# API and data fetching
npm install axios swr

# State management
npm install zustand

# Date formatting and utilities
npm install date-fns

# Development tools
npm install -D prettier prettier-plugin-tailwindcss
npm install -D husky lint-staged
```

### 3. Set Up TailwindCSS with Custom Theme

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary
        primary: {
          DEFAULT: "#1a365d", // Deep blue
          50: "#eef2f7",
          100: "#d1daea",
          200: "#a3b5d5",
          300: "#7591c0",
          400: "#476dab",
          500: "#1a4996",
          600: "#1a365d", // Default
          700: "#132845",
          800: "#0c1a2e",
          900: "#060d17",
        },
        // Secondary (Teal)
        secondary: {
          DEFAULT: "#2c7a7b",
          50: "#e6f7f7",
          100: "#c3e8e9",
          200: "#9fdada",
          300: "#7ccbcb",
          400: "#58bcbd",
          500: "#35adae",
          600: "#2c7a7b", // Default
          700: "#225c5d",
          800: "#193e3e",
          900: "#0f2020",
        },
        // Alert colors
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
        info: "#3b82f6",
        // Neutral colors for backgrounds and text
        background: "#f9fafb",
        foreground: "#1e293b",
        muted: "#94a3b8",
        border: "#e2e8f0",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        dropdown: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        button: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 4. Configure API Client (src/lib/api.ts)

```typescript
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle token refresh on 401 errors (optional)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refreshToken }
        );
        
        const { token } = response.data;
        localStorage.setItem('token', token);
        
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (err) {
        // Handle failed refresh - redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

### 5. Set Up Authentication Context (src/providers/auth-provider.tsx)

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth-service';
import type { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to initialize auth', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user, token, refreshToken } = await authService.login(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/login');
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      // Automatically log in after successful registration
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        setUser(response.user);
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### 6. Set Up Root Layout (src/app/layout.tsx)

```typescript
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/providers/auth-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Escrow Marketplace',
  description: 'Secure transactions for buyers and sellers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 7. Create Base Button Component (src/components/ui/button.tsx)

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-700 active:bg-primary-800",
        secondary: "bg-secondary text-white hover:bg-secondary-700 active:bg-secondary-800",
        outline: "border border-primary text-primary hover:bg-primary-50",
        ghost: "text-primary hover:bg-primary-50",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-white hover:bg-success/90",
        danger: "bg-danger text-white hover:bg-danger/90",
        warning: "bg-warning text-white hover:bg-warning/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### 8. Create Transaction Service (src/services/transaction-service.ts)

```typescript
import api from '@/lib/api';
import type { Transaction, TransactionCreate } from '@/types/transaction';

const transactionService = {
  // Get all transactions for current user
  getTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get('/transactions');
    return response.data;
  },

  // Get transaction by ID
  getTransaction: async (id: string): Promise<Transaction> => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  // Create new transaction
  createTransaction: async (data: TransactionCreate): Promise<Transaction> => {
    const response = await api.post('/transactions', data);
    return response.data;
  },

  // Update transaction
  updateTransaction: async (id: string, data: Partial<Transaction>): Promise<Transaction> => {
    const response = await api.put(`/transactions/${id}`, data);
    return response.data;
  },

  // Approve transaction
  approveTransaction: async (id: string): Promise<Transaction> => {
    const response = await api.post(`/transactions/${id}/approve`);
    return response.data;
  },

  // Reject transaction
  rejectTransaction: async (id: string, reason: string): Promise<Transaction> => {
    const response = await api.post(`/transactions/${id}/reject`, { reason });
    return response.data;
  },

  // Submit dispute
  submitDispute: async (id: string, reason: string, evidence?: File[]): Promise<Transaction> => {
    const formData = new FormData();
    formData.append('reason', reason);
    
    if (evidence && evidence.length > 0) {
      evidence.forEach((file, index) => {
        formData.append(`evidence_${index}`, file);
      });
    }
    
    const response = await api.post(
      `/transactions/${id}/dispute`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data;
  },
};

export default transactionService;
```

### 9. Create Custom SWR Hook for Transactions (src/hooks/use-transactions.ts)

```typescript
import useSWR from 'swr';
import transactionService from '@/services/transaction-service';
import type { Transaction } from '@/types/transaction';

export function useTransactions() {
  const { data, error, mutate } = useSWR<Transaction[]>(
    'transactions',
    () => transactionService.getTransactions()
  );

  return {
    transactions: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useTransaction(id: string | null) {
  const { data, error, mutate } = useSWR<Transaction>(
    id ? `transaction-${id}` : null,
    () => id ? transactionService.getTransaction(id) : null
  );

  return {
    transaction: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
```

### 10. Create Dashboard Layout (src/app/(dashboard)/layout.tsx)

```typescript
import { redirect } from 'next/navigation';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication check
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### 11. Create Dashboard Page (src/app/(dashboard)/page.tsx)

```typescript
import { Suspense } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TransactionList from '@/components/features/transactions/transaction-list';
import DashboardStats from '@/components/features/dashboard/dashboard-stats';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link href="/create">Create Escrow</Link>
        </Button>
      </div>
      
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <Suspense fallback={<TransactionListSkeleton />}>
          <TransactionList limit={5} />
        </Suspense>
      </div>
    </div>
  );
}

function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array(4).fill(null).map((_, i) => (
        <Card key={i} className="p-6">
          <Skeleton className="h-7 w-1/2" />
          <Skeleton className="mt-3 h-10 w-full" />
        </Card>
      ))}
    </div>
  );
}

function TransactionListSkeleton() {
  return (
    <Card>
      <div className="p-6">
        {Array(5).fill(null).map((_, i) => (
          <div key={i} className="mb-4 flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
```

### 12. Create Utils for ClassName Merging (src/lib/utils.ts)

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency with locale
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Format date with options
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(dateObj);
  }
  
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(dateObj);
}

// Get status color based on transaction status
export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    pending: 'text-warning bg-warning/10',
    active: 'text-info bg-info/10',
    completed: 'text-success bg-success/10',
    disputed: 'text-danger bg-danger/10',
    cancelled: 'text-muted bg-muted/10',
  };
  
  return statusMap[status] || 'text-muted bg-muted/10';
}

// Truncate text with ellipsis
export function truncate(text: string, length = 50): string {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}

// Generate initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}
```

### 13. Set Up Jest for Testing

Create a basic Jest setup with React Testing Library:

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest
```

Create `jest.config.js`:

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
```

Create `jest.setup.js`:

```javascript
import '@testing-library/jest-dom/extend-expect';
```

### 14. Create TypeScript Type Definitions (src/types/transaction.ts)

```typescript
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
```

### 15. Set Up ESLint and Prettier

Update `.eslintrc.json`:

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "@next/next/no-img-element": "off"
  }
}
```

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### 16. Set Up Husky for Git Hooks

Initialize Husky:

```bash
npx husky-init && npm install
```

Create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

Create `.lintstagedrc.js`:

```javascript
module.exports = {
  "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
  "*.{json,css,md}": ["prettier --write"]
};
```

## Component Examples

### 1. Transaction Card Component (src/components/features/transactions/transaction-card.tsx)

```typescript
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { formatCurrency, formatDate, getStatusColor, getInitials } from '@/lib/utils';
import type { Transaction } from '@/types/transaction';

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const { id, title, amount, currency, status, createdAt, parties } = transaction;
  
  // Find counterparty (not the current user)
  const counterparty = parties.find(party => party.role !== 'mediator');
  
  return (
    <Link href={`/transactions/${id}`} className="block transition-opacity hover:opacity-90">
      <Card className="h-full overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 bg-primary text-white">
              <span>{counterparty ? getInitials(counterparty.user.name) : 'TX'}</span>
            </Avatar>
            <div className="font-medium">{title}</div>
          </div>
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-lg font-semibold">
            {formatCurrency(amount, currency)}
          </div>
          <p className="text-sm text-muted-foreground">
            Created {formatDate(createdAt)}
          </p>
        </CardContent>
        <CardFooter className="border-t bg-muted/20 px-4 py-2">
          <div className="flex items-center justify-between w-full">
            <div className="text-xs text-muted-foreground">
              {parties.length} parties involved
            </div>
            <div className="text-xs font-medium">
              View Details →
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
```

### 2. Transaction Timeline Component (src/components/features/transactions/transaction-timeline.tsx)

```typescript
import { formatDate } from '@/lib/utils';
import { CheckCircle, Clock, AlertCircle, Ban, FileText, DollarSign } from 'lucide-react';
import type { TransactionEvent } from '@/types/transaction';

interface TransactionTimelineProps {
  events: TransactionEvent[];
}

export default function TransactionTimeline({ events }: TransactionTimelineProps) {
  // Sort events by date (newest first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <FileText className="h-5 w-5 text-muted-foreground" />;
      case 'funded':
        return <DollarSign className="h-5 w-5 text-success" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'rejected':
        return <Ban className="h-5 w-5 text-danger" />;
      case 'disputed':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Transaction History</h3>
      
      <div className="space-y-6">
        {sortedEvents.map((event) => (
          <div key={event.id} className="flex items-start space-x-4">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border bg-background">
              {getEventIcon(event.type)}
            </div>
            
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{event.message}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(event.createdAt, 'long')}
              </p>
              
              {event.data && Object.keys(event.data).length > 0 && (
                <div className="mt-2 rounded-md bg-muted/50 p-2 text-xs">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(event.data, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {events.length === 0 && (
          <div className="rounded-md bg-muted/50 p-4 text-center">
            <p className="text-sm text-muted-foreground">No events recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 3. Create Escrow Form (src/components/forms/create-escrow-form.tsx)

```typescript
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { FileUpload } from '@/components/ui/file-upload';
import transactionService from '@/services/transaction-service';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  amount: z.string().transform((val) => parseFloat(val)),
  currency: z.string().default('USD'),
  sellerId: z.string().min(1, { message: 'Seller is required' }),
  terms: z.string().min(20, { message: 'Terms must be at least 20 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateEscrowForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      amount: '',
      currency: 'USD',
      sellerId: '',
      terms: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const createdTransaction = await transactionService.createTransaction({
        ...values,
        amount: parseFloat(values.amount as unknown as string),
        documents: documents,
      });
      
      toast({
        title: 'Escrow Created',
        description: 'Your escrow has been successfully created.',
      });
      
      router.push(`/transactions/${createdTransaction.id}`);
    } catch (error) {
      console.error('Failed to create escrow', error);
      toast({
        title: 'Error',
        description: 'Failed to create escrow. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (files: File[]) => {
    setDocuments(files);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Escrow</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Transaction title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          step="0.01"
                          min="0"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the purpose of this escrow"
                      className="min-h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="sellerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seller</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select seller" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="seller-1">John Doe</SelectItem>
                      <SelectItem value="seller-2">Jane Smith</SelectItem>
                      <SelectItem value="seller-3">New Seller...</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terms & Conditions</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter the terms and conditions for this escrow"
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Documents</FormLabel>
              <FileUpload 
                maxFiles={5}
                maxSize={5 * 1024 * 1024} // 5MB
                acceptedFileTypes={['application/pdf', 'image/jpeg', 'image/png']}
                onChange={handleFileChange}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t p-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              isLoading={isSubmitting}
            >
              Create Escrow
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
```

### 4. Dashboard Stats Component (src/components/features/dashboard/dashboard-stats.tsx)

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/hooks/use-transactions';
import { formatCurrency } from '@/lib/utils';
import { 
  CircleDollarSign, 
  Clock, 
  CheckCircle2, 
  ShieldAlert 
} from 'lucide-react';

export default function DashboardStats() {
  const { transactions } = useTransactions();
  
  // Calculate statistics
  const totalActive = transactions.filter(t => 
    ['pending', 'funded', 'active'].includes(t.status)
  ).length;
  
  const totalCompleted = transactions.filter(t => t.status === 'completed').length;
  
  const totalDisputed = transactions.filter(t => t.status === 'disputed').length;
  
  const totalValue = transactions
    .filter(t => ['pending', 'funded', 'active'].includes(t.status))
    .reduce((sum, t) => sum + t.amount, 0);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Active Escrows</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalActive}</div>
          <p className="text-xs