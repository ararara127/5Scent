# 5SCENT Project Development Checklist

## Phase 1: Project Setup ✓

### Backend Setup
- [x] Create Laravel 12 project
- [x] Configure database credentials (.env)
- [x] Generate app key
- [x] Install Laravel Sanctum
- [x] Configure CORS and authentication
- [x] Create database in MySQL/MariaDB
- [x] Set up development server

### Frontend Setup
- [x] Create Next.js 16 project with TypeScript
- [x] Install Tailwind CSS 4
- [x] Install UI libraries (Headless UI, Heroicons, Lucide React)
- [x] Install HTTP client (Axios)
- [x] Install animations (Framer Motion)
- [x] Configure .env.local
- [x] Set up development server

---

## Phase 2: Database & Models

### Create Models and Migrations
- [ ] User model & migration
- [ ] Product model & migration
- [ ] ProductVariant model & migration
- [ ] Order model & migration
- [ ] OrderItem model & migration
- [ ] Rating model & migration
- [ ] Favorite model & migration
- [ ] POSTransaction model & migration

### Database Relationships
- [ ] User → Orders (one-to-many)
- [ ] Product → Variants (one-to-many)
- [ ] Product → Ratings (one-to-many)
- [ ] Product → Favorites (many-to-many)
- [ ] Order → OrderItems (one-to-many)
- [ ] OrderItem → Rating (one-to-one)

### Run Migrations
- [ ] `php artisan migrate`
- [ ] Verify all tables created in database
- [ ] Test database connections

---

## Phase 3: Authentication

### Backend Authentication
- [ ] Register endpoint (`POST /auth/register`)
- [ ] Login endpoint (`POST /auth/login`)
- [ ] Logout endpoint (`POST /auth/logout`)
- [ ] Get current user (`GET /auth/user`)
- [ ] Update profile (`PATCH /auth/profile`)
- [ ] Password hashing and validation
- [ ] Token generation (Sanctum)
- [ ] Middleware for protected routes

### Frontend Authentication
- [ ] Create useAuth hook
- [ ] Login page with form
- [ ] Register page with form
- [ ] Logout functionality
- [ ] Token storage in localStorage
- [ ] Redirect to login for protected pages
- [ ] Auth context/provider setup

---

## Phase 4: Products Management

### Backend Products API
- [ ] ProductController (index, show, store, update, destroy)
- [ ] Product filtering by category
- [ ] Product filtering by time_type (day/night)
- [ ] Search products by name/description
- [ ] Get bestsellers
- [ ] List product variants
- [ ] Update product stock
- [ ] Soft delete products (optional)

### Frontend Product Pages
- [ ] Home page with bestsellers
- [ ] Product listing page
- [ ] Product filtering/search
- [ ] Product detail page
- [ ] Product variant selection
- [ ] Rating and reviews display
- [ ] Product images
- [ ] Related products (optional)

---

## Phase 5: Shopping Cart

### Backend Cart Logic
- [ ] Cart can be client-side (localStorage) or server-side
- [ ] For this project: client-side with localStorage
- [ ] Validate items before checkout

### Frontend Cart
- [ ] Cart context/store (Zustand)
- [ ] Add to cart functionality
- [ ] Remove from cart
- [ ] Update quantity
- [ ] Cart page with summary
- [ ] Persist cart in localStorage
- [ ] Display cart count in header

---

## Phase 6: Orders & Checkout

### Backend Orders API
- [ ] Create order endpoint
- [ ] Get user orders
- [ ] Get order detail
- [ ] Update order status (admin)
- [ ] Cancel order (user, Packaging only)
- [ ] Mark order as delivered (user)
- [ ] Order number generation
- [ ] Calculate order totals

### Frontend Checkout
- [ ] Checkout page layout
- [ ] Shipping address input
- [ ] Order review/summary
- [ ] Payment method selection
- [ ] Place order functionality
- [ ] Order confirmation
- [ ] Order history page
- [ ] Order detail view
- [ ] Status tracking/timeline

---

## Phase 7: Ratings & Reviews

### Backend Ratings API
- [ ] Create rating endpoint
- [ ] Get product ratings
- [ ] Average rating calculation
- [ ] Prevent duplicate ratings
- [ ] Validation (1-5 stars)

### Frontend Ratings
- [ ] Display ratings on product detail
- [ ] Show reviews list
- [ ] Rating stars display
- [ ] Add rating form (for delivered orders only)
- [ ] Submit review functionality
- [ ] Edit/delete rating (optional)

---

## Phase 8: Favorites/Wishlist

### Backend Favorites API
- [ ] Toggle favorite endpoint
- [ ] Get user favorites
- [ ] Check if product is favorited
- [ ] Many-to-many relationship

### Frontend Favorites
- [ ] Heart icon toggle
- [ ] Add to favorites
- [ ] Remove from favorites
- [ ] Favorites page
- [ ] Persist favorites (optional: to backend)
- [ ] Visual indicator on product cards

---

## Phase 9: Payment Integration (Midtrans QRIS)

### Backend Payment
- [ ] Install Midtrans SDK
- [ ] Create payment endpoint
- [ ] Generate QRIS code
- [ ] Create transaction on Midtrans
- [ ] Store transaction ID
- [ ] Handle webhook callbacks
- [ ] Update order status on payment success
- [ ] Store payment status

### Frontend Payment
- [ ] Display payment method options
- [ ] QRIS payment page
- [ ] Show QR code for scanning
- [ ] Handle payment status polling
- [ ] Success/failure handling
- [ ] COD payment (simple checkbox)
- [ ] Redirect to payment gateway (optional)

---

## Phase 10: POS (Point of Sale)

### Backend POS
- [ ] Create POS transaction endpoint
- [ ] Product lookup by code
- [ ] Calculate totals and change
- [ ] Store POS transactions
- [ ] Get receipt data
- [ ] Generate receipt number

### Frontend POS
- [ ] POS page layout
- [ ] Product code input
- [ ] Product lookup display
- [ ] Variant selection
- [ ] Quantity input
- [ ] Cash amount input
- [ ] Calculate change
- [ ] Receipt display
- [ ] Print receipt functionality
- [ ] Download receipt as PDF

---

## Phase 11: Admin Dashboard

### Backend Admin Endpoints
- [ ] Admin middleware/authorization
- [ ] Get all products (admin)
- [ ] Get all orders (admin)
- [ ] Filter orders by status
- [ ] Update order status
- [ ] Add tracking number
- [ ] Stock management endpoints
- [ ] Sales reports endpoints

### Frontend Admin Pages
- [ ] Admin layout/navigation
- [ ] Product management page
  - [ ] Create product form
  - [ ] Edit product form
  - [ ] Delete product
  - [ ] Manage variants & pricing
- [ ] Order management page
  - [ ] List all orders
  - [ ] Filter by status
  - [ ] Update order status
  - [ ] Add tracking number
  - [ ] View order details
- [ ] Stock management
- [ ] Sales reports
  - [ ] Date range filter
  - [ ] Export to CSV/Excel
  - [ ] Export to PDF
  - [ ] Sales charts (optional)

---

## Phase 12: Email Notifications (Optional)

### Backend Email
- [ ] Configure mail service
- [ ] Order confirmation email template
- [ ] Email queue (optional)
- [ ] Send on order creation
- [ ] Send on status update

### Email Templates
- [ ] Order confirmation
- [ ] Order shipped
- [ ] Order delivered
- [ ] Order cancelled
- [ ] Password reset (optional)

---

## Phase 13: Frontend Components

### Layout Components
- [ ] Header with navigation
- [ ] Search bar with suggestions
- [ ] Shopping cart sidebar/dropdown
- [ ] User profile dropdown
- [ ] Footer
- [ ] Breadcrumbs
- [ ] Loading spinner
- [ ] Error messages
- [ ] Success notifications

### UI Components
- [ ] Button (primary, secondary, danger)
- [ ] Input fields
- [ ] Textarea
- [ ] Select dropdown
- [ ] Checkbox
- [ ] Radio buttons
- [ ] Modal/Dialog
- [ ] Card component
- [ ] Badge
- [ ] Rating stars
- [ ] Pagination

### Specialized Components
- [ ] Product card
- [ ] Product variant selector
- [ ] Quantity selector
- [ ] Order status timeline
- [ ] Payment method selector
- [ ] Address input
- [ ] Review form

---

## Phase 14: Testing

### Backend Testing
- [ ] Unit tests for models
- [ ] Feature tests for API endpoints
- [ ] Authentication tests
- [ ] Authorization tests
- [ ] Payment tests (mock Midtrans)
- [ ] Database transaction tests

### Frontend Testing
- [ ] Component unit tests
- [ ] Page tests
- [ ] Integration tests
- [ ] API client tests
- [ ] Form validation tests
- [ ] Authentication flow tests

---

## Phase 15: UI/UX Enhancements

- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Loading states
- [ ] Error handling and messages
- [ ] Success notifications
- [ ] Form validation messages
- [ ] Empty states
- [ ] Skeleton screens
- [ ] Animations and transitions
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Dark mode support (optional)

---

## Phase 16: Performance & Optimization

### Backend
- [ ] Database query optimization
- [ ] Eager loading (with)
- [ ] Pagination for large datasets
- [ ] Caching strategies
- [ ] API response compression
- [ ] Minify migrations

### Frontend
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading images
- [ ] Lazy loading components
- [ ] Minify CSS/JS
- [ ] Remove unused dependencies
- [ ] Bundle size analysis

---

## Phase 17: Security

### Backend
- [ ] Input validation
- [ ] SQL injection prevention (use ORM)
- [ ] CSRF protection
- [ ] XSS prevention
- [ ] Rate limiting
- [ ] API authentication (Sanctum)
- [ ] Authorization checks
- [ ] Secure password hashing
- [ ] HTTPS configuration
- [ ] API key rotation

### Frontend
- [ ] Secure token storage
- [ ] XSS prevention
- [ ] CSRF token in forms
- [ ] Input sanitization
- [ ] Secure API calls
- [ ] Environment variable protection
- [ ] No sensitive data in localStorage

---

## Phase 18: Documentation

### Code Documentation
- [ ] Code comments for complex logic
- [ ] JSDoc for functions
- [ ] README files
- [ ] Component prop types documentation
- [ ] API endpoint documentation (DONE ✓)
- [ ] Setup guide (DONE ✓)

### User Documentation
- [ ] How to use POS
- [ ] How to place an order
- [ ] How to track order
- [ ] How to review products
- [ ] FAQ section

---

## Phase 19: Deployment Preparation

### Backend
- [ ] Set up production database
- [ ] Configure production .env
- [ ] Run migrations on production
- [ ] Set up SSL certificate
- [ ] Configure email service
- [ ] Set up logging
- [ ] Configure backup strategy
- [ ] Domain setup

### Frontend
- [ ] Build optimization
- [ ] Set up deployment pipeline (GitHub Actions, etc.)
- [ ] Configure production API URL
- [ ] Set up CDN (optional)
- [ ] Configure caching headers

---

## Phase 20: Launch & Monitoring

- [ ] Smoke tests on production
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Check website speed
- [ ] Test payment flow
- [ ] Test order creation
- [ ] User feedback collection
- [ ] Bug tracking setup
- [ ] Analytics setup (optional)

---

## Development Timeline Estimate

| Phase | Tasks | Effort | Days |
|-------|-------|--------|------|
| 1 | Setup | ✓ | 1 |
| 2 | Database & Models | 8 | 2 |
| 3 | Authentication | 6 | 2 |
| 4 | Products | 6 | 2 |
| 5 | Cart | 4 | 1 |
| 6 | Orders & Checkout | 8 | 3 |
| 7 | Ratings | 4 | 1 |
| 8 | Favorites | 3 | 1 |
| 9 | Payment | 8 | 3 |
| 10 | POS | 6 | 2 |
| 11 | Admin | 10 | 4 |
| 12 | Email | 4 | 1 |
| 13 | Components | 12 | 4 |
| 14 | Testing | 8 | 3 |
| 15 | UI/UX | 8 | 3 |
| 16 | Performance | 6 | 2 |
| 17 | Security | 6 | 2 |
| 18 | Documentation | 4 | 1 |
| 19 | Deployment | 6 | 2 |
| 20 | Launch | 4 | 1 |
| **TOTAL** | | **131** | **40 days** |

---

## Quick Reference Links

### Documentation Created
- `README.md` - Project overview
- `INSTALLATION_GUIDE.md` - Step-by-step setup
- `API_DOCUMENTATION.md` - Complete API reference
- `ENV_EXAMPLES.md` - Environment configuration
- `backend/BACKEND_SETUP.md` - Backend details
- `backend/MODELS_MIGRATIONS.md` - Database schema
- `backend/CONTROLLERS_ROUTES.md` - API implementation
- `frontend/FRONTEND_SETUP.md` - Frontend details
- `frontend/COMPONENTS_PAGES.md` - React examples

### External Resources
- [Laravel Documentation](https://laravel.com/docs/12.x)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Laravel Sanctum](https://laravel.com/docs/12.x/sanctum)
- [Midtrans Documentation](https://docs.midtrans.com)

---

## Tips for Smooth Development

1. **Start with Backend API** - Get all endpoints working first
2. **Test APIs with Postman** - Before connecting to frontend
3. **Build UI Components First** - Before integrating with APIs
4. **Use Environment Variables** - Never hardcode secrets
5. **Commit Frequently** - Push changes to Git regularly
6. **Test on Mobile** - Use phone/tablet during development
7. **Keep Dependencies Updated** - But test thoroughly
8. **Document as You Go** - Don't leave docs for the end
9. **Get User Feedback Early** - Iterate based on feedback
10. **Monitor Errors** - Use logging to catch issues early

---

## Need Help?

Refer to the documentation files:
- **Setup Issues?** → INSTALLATION_GUIDE.md
- **API Questions?** → API_DOCUMENTATION.md
- **Environment Errors?** → ENV_EXAMPLES.md
- **Backend Details?** → backend/CONTROLLERS_ROUTES.md
- **Frontend Code?** → frontend/COMPONENTS_PAGES.md
- **Database Schema?** → backend/MODELS_MIGRATIONS.md

---

**Last Updated:** November 2025
**Project Status:** Ready for Development
