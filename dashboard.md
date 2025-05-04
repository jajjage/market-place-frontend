# Escrow Platform Dashboard Design Outline

## Overview

This document outlines the comprehensive dashboard design for an escrow platform that serves both buyers and sellers. The dashboard is designed to accommodate different user roles with tailored experiences while maintaining a consistent interface.

## User Types & Personalized Dashboards

### BUYER Dashboard Focus

- Transaction safety
- Purchase tracking
- Fund management
- Seller verification status visibility

### SELLER Dashboard Focus

- Store management
- Sales analytics
- Reputation management
- Verification enhancement

## Global Layout Structure

### Desktop Layout

- **Main Container**: Flex layout (sidebar + content)
- **Sidebar**: Fixed width (280px), full height, collapsible to icon-only mode (70px)
- **Content Area**: Dynamic width with responsive padding
  - Top navbar (65px height)
  - Main content area with contextual components

### Mobile Layout

- **Top Navbar**: Fixed, contains critical navigation
- **Content Area**: Full-width, scrollable
- **Sidebar**: Transforms to slide-in drawer, triggered by hamburger menu
- **Bottom Navigation Bar**: Quick access to primary actions

## Authentication & User Context

- Dashboard detects user type (`BUYER` or `SELLER`) from API response
- All views adapt to show relevant information based on user_type
- Conditional navigation items and action buttons per user type

## Sidebar Components (shadcn/ui implementation)

### Branding Section

- Platform logo (collapsible to icon-only version)
- Current environment indicator (if applicable)

### User Profile Section

- Profile picture (or placeholder if `profile_picture: null`)
- Display name (formatted as `{first_name} {last_name}`)
- Verification badge (based on `verification_status`)
- Quick access to profile settings

### Primary Navigation - BOTH USER TYPES

- **Dashboard/Home**: Overview stats and activity
- **Transactions**: All escrow transactions
- **Messages**: Communication center
- **Wallet**: Fund management
- **Settings**: Account preferences

### Additional Navigation - BUYER

- **My Purchases**: Purchase history and active orders
- **Saved Sellers**: Bookmarked trusted sellers

### Additional Navigation - SELLER

- **My Store**: Store management (hidden if `store: null`)
- **Sales**: Sales history and analytics
- **Ratings**: Reputation management (`received_ratings`)
- **Analytics**: Performance metrics

### Secondary Navigation

- Help Center
- Documentation
- Support/Contact

### Collapse Control

- Toggle button to expand/collapse sidebar
- Preserves state between sessions

## Top Navbar Components

### Left Section

- **Page Title**: Context-aware heading
- **Breadcrumb**: Navigation path

### Center Section (Desktop)

- **Global Search**: Find transactions, products, or users

### Right Section

- **Notifications**: Alert bell with counter
- **Messages**: Quick access to communications
- **User Menu**: Profile dropdown with:
  - User info summary
  - Verification status
  - Quick settings
  - Logout option

## Dashboard Home (Overview)

### Shared Components (Both Users)

- **Welcome Banner**: Personalized greeting with verification prompts if needed
- **Quick Actions**: Context-aware primary actions
- **Recent Activity**: Timeline of latest transaction events

### BUYER-Specific Components

- **Active Purchases**: Cards showing in-progress transactions
- **Funds in Escrow**: Total amount currently held
- **Purchase History**: Recent completed transactions
- **Trusted Sellers**: Quick access to previously used sellers

### SELLER-Specific Components

- **Sales Summary**: Key metrics (active sales, completed, total value)
- **Store Status**: Visibility and metrics (if `store` exists)
- **Recent Ratings**: Latest feedback from buyers
- **Verification Status**: Progress indicators for:
  - Email verification (`profile.email_verified`)
  - Phone verification (`profile.phone_verified`)
  - Identity verification (`profile.identity_verified`)

## Transaction Management

### Transaction List View

- **Filterable Table**: By status, date range, value
- **Search**: Find specific transactions
- **Status Indicators**: Visual cues for transaction stages
- **Action Buttons**: Contextual based on transaction status

### Transaction Detail View

- **Timeline**: Visual progression of escrow process
- **Party Information**: Details of counterparty
- **Document Section**: Attached files and contracts
- **Action Panel**: Context-aware buttons
- **Communication Thread**: In-context messaging
- **Payment Details**: Transfer information

## Profile Management

### Personal Information

- Edit profile details (maps to user data structure)
- Upload profile picture
- Manage display name (`profile.display_name`)

### Address Management

- Add/edit/remove addresses from `addresses` array
- Set default address
- Address type selection (billing, shipping, both)

### Verification Center

- Step-by-step verification processes:
  - Email verification
  - Phone verification
  - Identity verification
- Status indicators matching `verification_status`

## Seller-Specific Features

### Store Management (if applicable)

- Store setup wizard (when `store: null`)
- Store settings and branding
- Product/service listings

### Sales Dashboard

- Sales trend visualization
- Performance analytics
- Projected earnings

### Reputation Management

- Reviews display from `received_ratings`
- Rating analytics
- Response management

## Wallet & Payments

### Wallet Overview

- Current balance
- Recent transactions
- Pending escrow funds

### Payment Methods

- Add/manage payment options
- Default payment selection
- Transaction history

## Notifications & Communication

### Notification Center

- Transaction updates
- System alerts
- Customizable preferences (maps to `notification_email` and `notification_sms`)

### Messaging System

- Threaded conversations
- Transaction-linked chats
- File sharing capabilities

## Settings

### Account Settings

- Profile management
- Password & security
- Notification preferences

### Privacy Settings

- Information visibility control
- Data management options

## Mobile-Specific Adaptations

### Navigation

- Bottom navigation bar with critical actions
- Collapsible sections for improved scrolling
- Touch-optimized action buttons

### Layout Adjustments

- Single column layout
- Reduced data density
- Larger touch targets
- Pull-to-refresh functionality

## Technical Implementation Notes

### Next.js App Router Structure

- Layout components for persistent UI elements
- Dynamic routes for transaction details
- API routes for data fetching

### State Management

- Context API for user type and authentication state
- Local storage for preferences
- RTK Query or SWR for data fetching/caching

### Component Library Integration

- shadcn/ui as primary component library
- Custom styled components for unique UI elements
- Responsive breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Performance Considerations

- Lazy loading for non-critical components
- Virtualized lists for transaction history
- Optimistic UI updates for better perceived performance

## Accessibility Considerations

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast ratios
- Focus visible indicators

## Security Features

- Session timeout controls
- Activity logs
- Sensitive action confirmations
- 2FA integration points

<!-- base on this
Transaction safety
Purchase tracking
Seller verification status visibility
Dashboard/Home: Overview stats and activity
Transactions: All escrow transactions
Messages: Communication center
Wallet: Fund management
Settings: Account preferences

which are from ui perspective on top of my recent models how many models do you think i should add  -->
