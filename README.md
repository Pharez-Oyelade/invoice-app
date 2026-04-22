# Invoice App

A modern, responsive Invoice Management Application built with React and TypeScript. Create, Read, manage, filter and track invoices with a responsive interface on mobile, tablets and desktop devices.

## Features

- **Create & Manage Invoices** — Create new invoices, read (view) invoices, delete invoices, save as drafts, or send immediately
- **Invoice Dashboard** — View all invoices with filtering by status (draft, pending, paid)
- **Detailed Views** — Full invoice detail page with sender/client addresses and item details
- **Invoice Items** — Add multiple line items with automatic total calculations (quantity × price)
- **Status Tracking** — Mark invoices as paid, edit, or delete
- **Payment Terms** — Configure payment terms (Net 1, 7, 14, or 30 days) with automatic due date calculation
- **Client Billing** — Address fields for both sender and client information
- **Dark/Light Theme** — Toggle between light and dark modes with persistent storage
- **Responsive Design** — Mobile-first layout optimized for all screen sizes
- **Data Persistence** — All invoices stored in browser's localStorage

## Tech Stack

| Layer                | Technology                   |
| -------------------- | ---------------------------- |
| **Build Tool**       | Vite                         |
| **Runtime**          | React 19                     |
| **Language**         | TypeScript                   |
| **Routing**          | React Router 7               |
| **Styling**          | Tailwind CSS 4 + Custom CSS  |
| **Icons**            | Lucide React Icons           |
| **State Management** | React Context + localStorage |
| **Package Manager**  | pnpm                         |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/Pharez-Oyelade/invoice-app.git
cd invoice-app

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The application will be available at `http://localhost:5173` (Vite default).

### Build for Production

```bash
# Type-check and build
pnpm run build

# Preview production build locally
pnpm run preview
```

## Architecture

### Component Hierarchy

```
App (InvoiceProvider)
├── Sidebar (theme toggle, logo, avatar)
└── Routes
    ├── InvoiceListPage (dashboard with filters)
    │   ├── InvoiceCard (list items)
    │   └── InvoiceForm (modal for create/edit)
    │       ├── AddressFields (sender address)
    │       ├── AddressFields (client address)
    │       └── InvoiceItems (line item table)
    └── InvoiceDetailPage (view invoice details)
        ├── Invoice metadata + status
        ├── Sender/Client address display
        ├── Items breakdown
        └── Action buttons (Mark Paid, Edit, Delete)
```

### State Management

The app uses **React Context API** with localStorage for persistence:

**InvoiceContext** ([src/context/InvoiceContext.tsx](src/context/InvoiceContext.tsx)):

- **State**: `invoices[]`, `theme` ("light" | "dark")
- **Actions**: `addInvoice()`, `updateInvoice()`, `markAsPaid()`, `deleteInvoice()`, `toggleTheme()`
- **Persistence**:
  - Invoices synced to `localStorage.invoices` on every mutation
  - Theme synced to `localStorage.theme` and `document.documentElement.data-theme`
  - Loads from localStorage on app start, falls back to seed data

**Custom Hook** ([src/hooks/useInvoiceForm.ts](src/hooks/useInvoiceForm.ts)):

- Form state managed via `useReducer`
- Actions: `SET_FIELD`, `SET_ADDRESS_FIELD`, `ADD_ITEM`, `UPDATE_ITEM`, `REMOVE_ITEM`, `LOAD`, `RESET`
- Auto-calculates item totals and grand total
- Supports both editing existing invoices and creating new ones

### Data Model

```typescript
interface Invoice {
  id: string; // e.g., "RT3080"
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "draft" | "pending" | "paid";
  senderAddress: Address;
  clientAddress: Address;
  items: InvoiceItem[];
  total: number;
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total?: number; // Calculated: quantity × price
}
```

### Utilities

**Helpers** ([src/utils/helpers.ts](src/utils/helpers.ts)):

- `generateId()` — Creates random invoice IDs (3 letters + 4 digits, e.g., "RT3080")
- `formatCurrency(amount)` — Formats amounts as GBP currency (e.g., "£1,234.50")
- `formatDate(dateStr)` — Converts ISO dates to "DD MMM YYYY" (e.g., "19 Aug 2021")
- `addDays(dateStr, days)` — Calculates payment due date from terms
- `todayISO()` — Returns current date in ISO format

**Validators** ([src/utils/validators.ts](src/utils/validators.ts)):

- `validateInvoice(form)` — Strict validation for "Save & Send"
  - Requires all fields (sender/client info, description)
  - At least one item with valid name, quantity, and price
  - Returns error map for inline display
- `validateDraft(form)` — Lenient validation for "Save as Draft"
  - Only validates item names if items are present
  - Allows incomplete invoice data

## Trade-offs & Design Decisions

### Advantages

- **Simple state management** — Context API + localStorage is lightweight; no Redux/Zustand complexity
- **Accessibility-first** — All form inputs have proper labels, error message, and ARIA attributes
- **Mobile-responsive** — Tailwind CSS with mobile-first breakpoints (mobile, tablet, desktop)
- **Dual validation** — Users can save incomplete drafts or strict finalized invoices
- **Reusable components** — AddressFields component handles both sender and client information
- **Theme support** — CSS custom properties enable easy light/dark mode toggling
- **Developer experience** — React Compiler enabled for automatic optimization

### Limitations

- **No backend persistence** — All data stored locally in browser, clearing cache will delete all invoices
- **Single-tab limitation** — If multiple tabs are open, localStorage changes in one tab won't sync to others
- **No undo/redo** — Deleted invoices cannot be recovered

### Why These Trade-offs?

- **localStorage over backend** — Simpler demo, easy migration to backend later
- **Context API over Redux** — App state is simpler; Redux would be over-engineering

## Accessibility Features

### Implemented

- Form inputs have proper `<label>` elements with `htmlFor` associations
- Error messages displayed inline with `aria-invalid` indicators
- Status badges include both visual color indicators and text labels
- Buttons have descriptive `aria-label` attributes (e.g., theme toggle)
- Delete confirmations use `role="dialog"` with `aria-modal="true"` and ESC to close
- Keyboard navigation: Tab through inputs, Enter to submit, Escape to cancel
- Focus styles visible on inputs and buttons (`focus:ring-2`)
- Semantic HTML: `<button>` instead of `<div>`, proper form structure
- Theme toggle respects system preferences initially (via CSS custom properties)

## File Structure

```
src/
├── assets/
│   └── invoices.ts              # Sample/seed invoice data (6 pre-populated invoices)
├── components/
│   ├── invoice/
│   │   ├── AddressFields.tsx    # Reusable address input group (sender & client)
│   │   ├── InvoiceCard.tsx      # List item component for invoice grid
│   │   ├── InvoiceForm.tsx      # Modal drawer for create/edit operations
│   │   └── InvoiceItems.tsx     # Table interface for line items
│   ├── layout/
│   │   └── Sidebar.tsx          # Navigation sidebar with theme toggle
│   └── ui/
│       └── Button.tsx           # Polymorphic button component (6 variants)
├── context/
│   └── InvoiceContext.tsx       # Global state, localStorage sync, provider
├── hooks/
│   └── useInvoiceForm.ts        # Form reducer for create/edit workflows
├── pages/
│   ├── InvoiceDetailPage.tsx    # Invoice detail view
│   └── InvoiceListPage.tsx      # Dashboard with list and filters
├── utils/
│   ├── helpers.ts              # Pure utilities (format, calculate, generate)
│   └── validators.ts           # Strict & lenient validation functions
├── App.tsx                      # Main router component
├── App.css                      # Component-specific styles
├── index.css                    # Global styles, theme variables, Tailwind
├── main.tsx                     # React entry point
├── vite.config.ts              # Build configuration
└── tsconfig.*.json             # TypeScript configuration
```

## Key Components

### InvoiceForm

Modal drawer for creating and editing invoices. Features:

- Two save modes: "Save as Draft" (lenient validation) and "Save & Send" (strict validation)
- Dynamic form state management with `useReducer`
- Address fields for sender and client
- Line item management (add, update, remove)
- Real-time grand total calculation

### InvoiceCard

List item for invoice grid display. Shows:

- Invoice ID (clickable to detail view)
- Client name
- Due date
- Total amount (formatted as GBP currency)
- Status badge with color indicator

### InvoiceItems

Table-like component for managing invoice line items. Features:

- Add/remove items
- Auto-calculate item totals (quantity × price)
- Quantity and price inputs with validation
- Accessibility labels for screen readers

### AddressFields

Reusable component for address input groups. Includes:

- Street, city, post code, country fields
- Individual error display below each field
- Used for both sender and client addresses

## Styling & Theme

### Tailwind CSS 4.2

- Utility-first approach with pre-defined breakpoints
- Mobile-first design (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- Custom theme colors via Tailwind config (purple accent: `#7C5DFA`)

### CSS Custom Properties

Located in [src/index.css](src/index.css):

- Light mode (default): `--bg-primary`, `--text-primary`, `--button-primary`, etc.
- Dark mode (`[data-theme="dark"]`): Override all color variables
- Easy theme switching without modifying Tailwind config

### Status Colors

- **Paid**: Green (`bg-green-100`, `text-green-700`)
- **Pending**: Orange (`bg-orange-100`, `text-orange-700`)
- **Draft**: Gray (`bg-gray-100`, `text-gray-700`)

## Future Improvements

### Backend Integration

- Add API layer for persisting invoices to server
- Implement user authentication (sign-up, login)
- Multi-user support with invoice ownership and permissions
- Conflict resolution for concurrent edits

### Enhanced Features

- Invoice templates (save common layouts)
- Recurring invoices (automatically generate on schedule)
- Email sending (send invoices directly to clients)
- PDF export (generate downloadable invoices)
- Payment tracking (integration with payment providers)
- Multi-currency support (currently GBP only)
- Search and advanced filtering (by date range, amount, client)
- Bulk operations (export multiple invoices)
