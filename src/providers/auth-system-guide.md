Authentication System Implementation Guide
This document outlines the simplified authentication system implementation designed to handle token expiration and refresh gracefully without requiring users to manually refresh the page.
Architecture Overview
The authentication system consists of four main components:

API Client (api.ts) - Handles HTTP requests and automatic token refresh
Query Client (query-client.ts) - Configures React Query for optimal auth handling
Auth Provider (auth-provider.tsx) - Manages auth state and inactivity detection
Auth Hooks (use-auth.ts) - Provides hooks for auth operations and user data

Key Features

Automatic Token Refresh: The system automatically refreshes expired tokens without user intervention
Inactivity Detection: Proactively refreshes tokens when users return after periods of inactivity
Synchronized State: Keeps Redux store and React Query cache in sync
Optimized Retries: Smart retry logic for failed requests after token refresh
Cross-Tab Support: Handles authentication events across browser tabs

Implementation Details
1. API Client (api.ts)
The API client uses Axios interceptors to:

Detect 401 Unauthorized responses
Queue failed requests during token refresh
Retry failed requests with new tokens
Dispatch events to notify the application about auth state changes

2. Query Client (query-client.ts)
The Query Client configures React Query with:

Optimal retry strategies for auth-related errors
Event listeners for token refresh and auth failures
Automatic invalidation of failed queries after token refresh

3. Auth Provider (auth-provider.tsx)
The Auth Provider:

Tracks user activity to detect inactivity periods
Proactively refreshes user data when returning from inactivity
Listens for visibility changes to handle background/foreground transitions
Manages auth-related events application-wide

4. Auth Hooks (use-auth.ts)
The auth hooks:

Provide consistent interfaces for login, logout, and user data
Synchronize React Query state with Redux store
Handle error states appropriately
Maintain localStorage auth flags for persistence

Usage Guidelines

App Initialization:

Wrap your application with the AuthProvider component
Initialize the query client at the app root


Authentication:

Use useCurrentUser() to access the current user data
Use useLogin() for authentication
Use useLogout() for logging out
Use useOAuthLogin() for OAuth authentication


Handling Token Expiration:

The system automatically handles token expiration and refresh
Failed requests are automatically retried after token refresh
No user intervention (page refresh) is required



Implementation Benefits

Improved UX: Users won't experience disruption when tokens expire
Reduced Complexity: Consolidated auth logic in fewer components
Better Maintainability: Clear separation of concerns
Enhanced Reliability: Robust handling of edge cases

The system is designed to be simple but comprehensive, handling all common authentication scenarios while maintaining code clarity.