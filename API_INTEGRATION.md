# API Integration — Component → Endpoint Mapping

Base URL: `https://rent-nest-backend-brown.vercel.app`

---

## Public Endpoints (No Auth)

| Frontend Action | Method | Backend Endpoint | Called By |
|----------------|--------|------------------|-----------|
| `getProperties()` | GET | `/api/properties` | `page.tsx` (home), `properties/page.tsx` (browse) |
| `getCategories()` | GET | `/api/category` | `properties/page.tsx` (browse), `properties/new/page.tsx`, `properties/[id]/edit/page.tsx` |
| `getPropertyById(id)` | GET | `/api/properties/:id` | `properties/[id]/page.tsx` (detail), `properties/[id]/edit/page.tsx` |
| `getReviewsByProperty(propertyId)` | GET | `/api/reviews/property/:propertyId` | `properties/[id]/page.tsx` (detail) |
| `loginUser(email, password)` | POST | `/api/auth/login` | `LoginForm.tsx` |
| `registerUser(payload)` | POST | `/api/users/register` | `RegisterForm.tsx` |

---

## Tenant Endpoints (Auth: TENANT)

| Frontend Action | Method | Backend Endpoint | Called By |
|----------------|--------|------------------|-----------|
| `getMe()` | GET | `/api/users/me` | All layouts, `properties/[id]/page.tsx`, `dashboard/page.tsx`, `requests/[id]/pay/page.tsx` |
| `createRentalRequest(payload)` | POST | `/api/rentals` | `RequestToRentDialog.tsx` |
| `getMyRentalRequests()` | GET | `/api/rentals` | `dashboard/page.tsx`, `dashboard/requests/page.tsx`, `dashboard/reviews/page.tsx`, `properties/[id]/page.tsx` |
| `getMyPayments()` | GET | `/api/payments` | `dashboard/page.tsx`, `dashboard/payments/page.tsx` |
| `getRentalRequestById(id)` | GET | `/api/rentals/:id` | `dashboard/requests/[id]/pay/page.tsx` |
| `createPaymentSession(rentalRequestId)` | POST | `/api/payments/create` | `PayNowButton.tsx` |
| `getPaymentBySessionId(sessionId)` | GET | `/api/payments` (filtered) | `payment/success/page.tsx` |
| `createReview(payload)` | POST | `/api/reviews` | `ReviewForm.tsx` |
| `logout()` | — | No API call (clears cookies) | `navbar.tsx` |

---

## Landlord Endpoints (Auth: LANDLORD)

| Frontend Action | Method | Backend Endpoint | Called By |
|----------------|--------|------------------|-----------|
| `getLandlordProperties()` | GET | `/api/properties` | `landlord-dashboard/page.tsx`, `landlord-dashboard/properties/page.tsx` |
| `getLandlordRentalRequests()` | GET | `/api/rentals/landlord` | `landlord-dashboard/page.tsx`, `landlord-dashboard/requests/page.tsx` |
| `getMyPayments()` | GET | `/api/payments` | `landlord-dashboard/page.tsx` |
| `createProperty(payload)` | POST | `/api/properties` | `PropertyForm.tsx` (create mode) |
| `updateProperty(propertyId, payload)` | PUT | `/api/properties/:propertyId` | `PropertyForm.tsx` (edit mode) |
| `deleteProperty(propertyId)` | DELETE | `/api/properties/:propertyId` | `DeletePropertyButton.tsx` |
| `updateRentalRequestStatus(rentalId, status)` | PATCH | `/api/rentals/landlord/:rentalId` | `RequestList.tsx` |

---

## Admin Endpoints (Auth: ADMIN)

| Frontend Action | Method | Backend Endpoint | Called By |
|----------------|--------|------------------|-----------|
| `getAllUsers()` | GET | `/api/admin/users` | `admin-dashboard/page.tsx`, `admin-dashboard/users/page.tsx` |
| `banUnbanUser(userId, status)` | PATCH | `/api/admin/users/:userId` | `UserManagementTable.tsx` |
| `getAllPropertiesAdmin()` | GET | `/api/admin/properties` | `admin-dashboard/page.tsx`, `admin-dashboard/properties/page.tsx` |
| `getAllRentalsAdmin()` | GET | `/api/admin/rentals` | `admin-dashboard/page.tsx`, `admin-dashboard/rentals/page.tsx` |
| `getMyPayments()` | GET | `/api/payments` | `admin-dashboard/page.tsx` |

---

## External APIs

| Frontend Function | Method | Endpoint | Called By |
|-------------------|--------|----------|-----------|
| `uploadToCloudinary()` | POST | `https://api.cloudinary.com/v1_1/{cloudName}/image/upload` | `PropertyForm.tsx` |

---

## Unused Backend Endpoints

| Method | Endpoint | Notes |
|--------|----------|-------|
| PUT | `/api/users/me` | Profile update — no frontend action calls it |
| POST | `/api/category` | Category creation — no frontend action calls it |
| GET | `/api/payments/:id` | Single payment — frontend filters from list instead |
| POST | `/api/payments/confirm` | Stripe webhook — called by Stripe, not frontend |

---

## File → Action Reference

| Server Action File | Functions |
|--------------------|-----------|
| `app/(authGroup)/_actions/authActions.ts` | `loginUser`, `registerUser` |
| `app/(publicGroup)/_actions/propertyActions.ts` | `getProperties`, `getCategories`, `getPropertyById`, `getReviewsByProperty`, `createRentalRequest`, `getMyRentalRequests` |
| `app/(dashboardGroup)/_actions/dashboardActions.ts` | `getMyRentalRequests`, `getMyPayments`, `getRentalRequestById`, `getAllUsers`, `banUnbanUser`, `getAllPropertiesAdmin`, `getAllRentalsAdmin`, `getLandlordProperties`, `getLandlordRentalRequests`, `updateRentalRequestStatus`, `createProperty`, `updateProperty`, `deleteProperty`, `createPaymentSession`, `getPaymentBySessionId`, `createReview` |
| `service/getMe.ts` | `getMe` |
| `service/logout.ts` | `logout` |
| `service/refreshToken.ts` | `refreshToken` |