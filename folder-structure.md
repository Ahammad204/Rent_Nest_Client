rentnest_client/
├── .env                            # BACKEND_API_URL, JWT/cookie secret if needed
├── .env.example
├── next.config.ts
├── tsconfig.json
├── components.json                 # shadcn/ui
├── postcss.config.mjs
├── eslint.config.mjs
├── proxy.ts                        # middleware: role check (TENANT/LANDLORD/ADMIN) + BANNED check
├── package.json
├── pnpm-workspace.yaml
│
├── app/
│   ├── layout.tsx                  # root layout (font, Toaster)
│   ├── globals.css
│   ├── loading.tsx / error.tsx / not-found.tsx
│   │
│   ├── (authGroup)/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx       # role selector: Tenant | Landlord
│   │   ├── _actions/authActions.ts # login/register/logout server actions
│   │   └── _components/            # LoginForm, RegisterForm, RoleSelector
│   │
│   ├── (publicGroup)/
│   │   ├── layout.tsx              # Navbar
│   │   ├── page.tsx                # / — featured properties
│   │   ├── properties/
│   │   │   ├── page.tsx            # /properties — search + filter + pagination
│   │   │   └── [id]/page.tsx       # /properties/:id — gallery + Request to Rent CTA
│   │   ├── _actions/               # getProperties, getPropertyById, getCategories, createRentalRequest
│   │   └── _components/            # PropertyCard, PropertyGrid, PropertyFilters, PropertyGallery, RequestToRentDialog, Pagination
│   │
│   ├── (dashboardGroup)/
│   │   ├── layout.tsx              # Navbar + SidebarProvider + DashboardSidebar (role-aware)
│   │   ├── dashboard/                          # TENANT
│   │   │   ├── page.tsx                        # overview: active rentals, pending requests
│   │   │   ├── requests/page.tsx               # history w/ status badges
│   │   │   ├── requests/[id]/pay/page.tsx      # Stripe checkout initiation
│   │   │   ├── payments/page.tsx               # payment history
│   │   │   └── reviews/page.tsx                # leave review (COMPLETED only)
│   │   ├── landlord-dashboard/                 # LANDLORD
│   │   │   ├── page.tsx                        # overview: properties, active requests, earnings
│   │   │   ├── properties/page.tsx
│   │   │   ├── properties/new/page.tsx
│   │   │   ├── properties/[id]/edit/page.tsx
│   │   │   └── requests/page.tsx               # approve/reject table
│   │   ├── admin-dashboard/                    # ADMIN
│   │   │   ├── page.tsx                        # platform stats
│   │   │   ├── users/page.tsx                  # search, pagination, ban/unban
│   │   │   ├── properties/page.tsx             # moderation
│   │   │   └── rentals/page.tsx                # platform-wide requests
│   │   ├── _actions/               # per-role server actions
│   │   ├── _components/            # DashboardSidebar, StatusBadge, RequestTable, PropertyFormDialog, UserManagementTable, EarningsSummary
│   │   └── _config/                # tenantSidebarItems, landlordSidebarItems, adminSidebarItems
│   │
│   └── payment/
│       ├── success/page.tsx        # /payment/success
│       └── cancel/page.tsx         # /payment/cancel
│
├── components/
│   ├── shared/navbar.tsx, footer.tsx
│   └── ui/                         # shadcn/ui primitives
│
├── hooks/use-mobile.ts
├── lib/
│   ├── nav-config.ts
│   ├── types.ts                    # IProperty, IUser, IRentalRequest, IPayment, IReview, ICategory
│   └── utils.ts
├── service/
│   ├── getMe.ts
│   ├── logout.ts
│   └── refreshToken.ts
├── utils/jwt.ts
└── public/