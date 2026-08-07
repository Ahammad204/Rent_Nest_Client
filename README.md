# Thikana

A full-stack rental property marketplace built for Bangladesh with BDT pricing, role-based dashboards, Stripe payment integration, and JWT authentication.

## Live Demo

- **Frontend:** [https://thikanaa.vercel.app/](https://thikanaa.vercel.app/)
- **Backend API:** [https://rent-nest-backend-brown.vercel.app/](https://rent-nest-backend-brown.vercel.app/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui |
| **Backend** | Express.js 5, Prisma 7, TypeScript, PostgreSQL |
| **Auth** | JWT (access + refresh tokens), httpOnly cookies, bcryptjs |
| **Payments** | Stripe Checkout Sessions + Webhooks |
| **Image Upload** | Cloudinary (unsigned upload) |
| **Deployment** | Vercel (frontend + backend), PostgreSQL |

---

## Features

### Authentication & Authorization
- JWT-based authentication with access + refresh token rotation
- httpOnly secure cookies for token storage
- Automatic token refresh on 401 responses
- Role-based access control: **Tenant**, **Landlord**, **Admin**

### Tenant Dashboard
- Browse and filter properties by location, price, type, and category
- Submit rental requests with move-in date and message
- View rental request status (Pending, Approved, Active, Completed)
- Make payments via Stripe for approved requests
- Leave reviews and ratings for completed rentals
- Edit profile (name, phone, bio)

### Landlord Dashboard
- Create, edit, and delete property listings
- Upload property images via Cloudinary
- View and manage rental requests
- Approve or reject tenant requests with optimistic updates
- View earnings and property statistics

### Admin Dashboard
- Overview statistics (users, properties, rentals, revenue)
- User management with search, filter, and ban/unban functionality
- View all properties and rental requests across the platform

### Public Pages
- Homepage with hero section, featured properties, trust stats, city browsing, how it works, testimonials, FAQ, and newsletter
- Property listing page with filters and pagination
- Property detail page with image gallery, info, reviews, and request-to-rent dialog

### UI/UX
- Responsive design with mobile sidebar navigation
- Skeleton loading states for all pages
- Error boundaries at every route group level
- Toast notifications for user feedback
- Zod validation on all forms

---

## Architecture

### Route Groups (Next.js App Router)

```
app/
├── (publicGroup)/       → Public pages (home, properties)
├── (authGroup)/         → Authentication (login, register)
├── (dashboardGroup)/    → Protected dashboards (tenant, landlord, admin)
└── payment/             → Stripe payment success/cancel
```

Each group has its own `layout.tsx`, `error.tsx`, and `loading.tsx`.

### Server Actions Pattern

All API calls use Next.js Server Actions with the `"use server"` directive:

```
Server Component → Server Action → Backend API → Response
```

- `service/getMe.ts` — Fetches authenticated user with auto-refresh
- `service/logout.ts` — Clears cookies and redirects
- `app/(authGroup)/_actions/authActions.ts` — Login, Register
- `app/(publicGroup)/_actions/propertyActions.ts` — Property CRUD
- `app/(dashboardGroup)/_actions/dashboardActions.ts` — Dashboard operations

### Component Structure

```
components/
├── ui/              → shadcn/ui components (button, dialog, sheet, etc.)
├── shared/          → Navbar, Footer
└── BlueprintCard.ts → Reusable card with corner tick decorations

app/(routeGroup)/
├── _components/     → Group-specific client components
├── _actions/        → Server actions
└── _config/         → Sidebar menu items, navigation config
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account (for payment integration)
- Cloudinary account (for image uploads)

### Installation

**Backend:**

```bash
cd ThikanaBackend
npm install
```

**Frontend:**

```bash
cd Thikanafrontend
pnpm install
```

### Environment Variables

**Backend** (`ThikanaBackend/.env`):

```env
DATABASE_URL="your-postgresql-connection-string"
PORT=5000
APP_URL=http://localhost:3000
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_SECRET=your-access-secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d
STRIPE_PRODUCT_ID=your-stripe-product-id
STRIPE_PRODUCT_PRICE_ID=your-stripe-price-id
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

**Frontend** (`Thikanafrontend/.env`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

### Database Setup

```bash
cd ThikanaBackend
npx prisma migrate dev
npx prisma db seed
```

### Running Locally

**Backend** (terminal 1):

```bash
cd ThikanaBackend
npm run dev
```

**Frontend** (terminal 2):

```bash
cd Thikanafrontend
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Endpoints

### Auth (`/api/auth`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/login` | Public | Login with email/password |
| POST | `/refresh-token` | Public | Refresh access token |

### Users (`/api/users`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | Public | Register new user |
| GET | `/me` | Any role | Get current user profile |
| PUT | `/me` | Any role | Update profile (name, phone, bio) |

### Properties (`/api/properties`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | Public | List properties with filters |
| GET | `/:id` | Public | Get property details |
| POST | `/` | Landlord | Create property |
| PUT | `/:id` | Landlord | Update property (ownership required) |
| DELETE | `/:id` | Landlord | Delete property (ownership required) |

### Rentals (`/api/rentals`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | Tenant | Create rental request |
| GET | `/` | Tenant/Landlord | Get own requests |
| GET | `/landlord` | Landlord | Get all requests on own properties |
| GET | `/:id` | Any role | Get rental request detail |
| PATCH | `/landlord/:id` | Landlord | Approve/reject request |

### Payments (`/api/payments`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/create` | Tenant | Create Stripe checkout session |
| GET | `/` | Any role | Get own payments |
| GET | `/:id` | Any role | Get payment detail |
| POST | `/confirm` | Webhook | Stripe webhook handler |

### Reviews (`/api/reviews`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | Tenant | Create review (1 per rental) |
| GET | `/property/:propertyId` | Public | Get reviews for property |

### Admin (`/api/admin`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/users` | Admin | List all users |
| PATCH | `/users/:id` | Admin | Ban/unban user |
| GET | `/properties` | Admin | List all properties |
| GET | `/rentals` | Admin | List all rentals |

---

## Database Schema

```
User 1──* Profile
User 1──* Property (as landlord)
User 1──* RentalRequest (as tenant)
User 1──* Review (as tenant)
Category 1──* Property
Property 1──* RentalRequest
Property 1──* Review
RentalRequest 1──1 Payment
RentalRequest 1──* Review
```

### Models

| Model | Key Fields |
|---|---|
| **User** | id, name, email (unique), password, role (TENANT/LANDLORD/ADMIN), status (ACTIVE/BANNED) |
| **Profile** | id, phone?, bio?, userId (unique) |
| **Property** | id, title, description?, price, location, propertyType, amenities[], status (AVAILABLE/RENTED), images[], landlordId, categoryId? |
| **Category** | id, name (unique), description? |
| **RentalRequest** | id, status (PENDING/APPROVED/REJECTED/ACTIVE/COMPLETED), moveInDate?, message?, tenantId, propertyId |
| **Payment** | id, transactionId (unique), amount, method?, status (PENDING/COMPLETED/FAILED), paidAt?, rentalRequestId (unique) |
| **Review** | id, rating (1-5), comment?, tenantId, propertyId, rentalRequestId. Unique: [tenantId, rentalRequestId] |

### Rental Status Lifecycle

```
PENDING ──┬──> APPROVED ──> ACTIVE ──> COMPLETED
          │
          └──> REJECTED (terminal)
```

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@rentnest.com | admin123 |
| **Landlord** | landlord@test.com | landlord123 |
| **Tenant** | tenant@test.com | tenant123 |

---

## Project Structure

### Frontend

```
Thikanafrontend/
├── app/
│   ├── (authGroup)/          → Login, Register
│   │   ├── _actions/         → authActions.ts
│   │   └── _components/      → LoginForm, RegisterForm, FormField, RoleSelector
│   ├── (publicGroup)/        → Home, Properties
│   │   ├── _actions/         → propertyActions.ts
│   │   ├── _components/      → Hero, PropertyCard, PropertyFilters, etc.
│   │   └── properties/       → /properties, /properties/[id]
│   ├── (dashboardGroup)/     → Dashboards
│   │   ├── _actions/         → dashboardActions.ts
│   │   ├── _components/      → PropertyForm, RequestList, ReviewForm, etc.
│   │   ├── dashboard/        → Tenant dashboard + sub-pages
│   │   ├── landlord-dashboard/ → Landlord dashboard + sub-pages
│   │   ├── admin-dashboard/  → Admin dashboard + sub-pages
│   │   └── profile/          → Profile page
│   └── payment/              → Stripe success/cancel
├── components/
│   ├── ui/                   → shadcn/ui components
│   ├── shared/               → navbar, footer
│   └── BlueprintCard.tsx     → Reusable card component
├── lib/
│   ├── types.ts              → TypeScript interfaces
│   ├── validations/          → Zod schemas (auth, property, rental)
│   ├── nav-config.ts         → Navigation config
│   └── utils.ts              → cn() utility
├── service/
│   ├── api.ts                → API client
│   ├── getMe.ts              → Fetch authenticated user
│   ├── logout.ts             → Logout action
│   └── refreshToken.ts       → Token refresh
└── utils/
    └── jwt.ts                → JWT decode utility
```

### Backend

```
ThikanaBackend/
├── src/
│   ├── modules/
│   │   ├── auth/             → Login, token refresh
│   │   ├── user/             → Register, profile
│   │   ├── admin/            → User/property/rental management
│   │   ├── properties/       → Property CRUD
│   │   ├── rental/           → Rental request lifecycle
│   │   ├── payment/          → Stripe integration
│   │   ├── review/           → Review system
│   │   └── category/         → Property categories
│   ├── middlewares/
│   │   ├── auth.ts           → JWT + role verification
│   │   ├── globalErrorHandlar.ts → Prisma-aware error handler
│   │   └── notFound.ts       → 404 handler
│   └── utils/
│       ├── AppError.ts       → Custom error class
│       ├── catchAsync.ts     → Async error wrapper
│       ├── jwt.ts            → JWT sign/verify
│       ├── ownershipCheck.ts → Resource ownership verification
│       └── sendResponse.ts   → Standardized JSON response
├── prisma/
│   ├── schema/               → Split schema files
│   ├── migrations/           → Database migrations
│   └── seed.ts               → Seed data
└── vercel.json               → Deployment config
```

---

## Deployment

| Service | Platform | Details |
|---|---|---|
| Frontend | Vercel | Auto-deploy from Git, `NEXT_PUBLIC_API_URL` env var |
| Backend | Vercel | Node.js serverless via `@vercel/node`, entry at `dist/server.js` |
| Database | PostgreSQL | Connected via `DATABASE_URL` |
| Payments | Stripe | Webhook endpoint at `/api/payments/confirm` |
| Images | Cloudinary | Unsigned upload with preset |

---

## Key Technical Decisions

1. **Server Actions over API routes** — All backend calls use Next.js Server Actions with `"use server"` for type-safe, cookie-aware data fetching without exposing API endpoints on the client.

2. **JWT with httpOnly cookies** — Tokens are stored in httpOnly cookies, never accessible to JavaScript. The `getMe()` server action handles automatic token refresh on 401 responses.

3. **Optimistic UI updates** — Landlord approve/reject and admin ban/unban use optimistic updates with Map-based state tracking for instant feedback with automatic rollback on failure.

4. **Server/Client component split** — Pages remain server components for SEO and performance. Interactive logic lives in client child components, keeping bundles lean.

5. **Modular backend architecture** — Each domain (auth, properties, rentals, payments) follows Controller → Service → Prisma pattern with dedicated routes, interfaces, and error handling.

---

## License

This project was built as part of ALevel-2 Mission-04 Assignment.
