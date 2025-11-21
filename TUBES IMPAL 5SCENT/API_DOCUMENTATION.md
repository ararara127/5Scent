# Complete API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
- Use **Laravel Sanctum** for token-based authentication
- Tokens last for 60 days by default
- Include token in header: `Authorization: Bearer {token}`

---

## Authentication Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "phone": "08123456789"
}

Response 201:
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "1|abcdef..."
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response 200:
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "is_admin": false
  },
  "token": "1|abcdef..."
}
```

### Get Current User (Protected)
```
GET /auth/user
Authorization: Bearer {token}

Response 200:
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "08123456789",
    "address": "123 Main St",
    "profile_picture": "url/to/image.jpg",
    "is_admin": false
  }
}
```

### Update Profile (Protected)
```
PATCH /auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "08198765432",
  "address": "456 New St",
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}

Response 200:
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

### Logout (Protected)
```
POST /auth/logout
Authorization: Bearer {token}

Response 200:
{
  "message": "Logout successful"
}
```

---

## Product Endpoints

### List Products
```
GET /products?page=1&per_page=12&category=male&time_type=day&search=rose&bestsellers=10

Query Parameters:
- page: int (default: 1)
- per_page: int (default: 12)
- category: male|female|unisex (optional)
- time_type: day|night (optional)
- search: string (optional)
- bestsellers: int (optional, returns top N bestsellers)

Response 200:
{
  "data": [
    {
      "id": 1,
      "name": "Rose Dreams",
      "slug": "rose-dreams",
      "description": "...",
      "notes": "Top: Rose, Middle: Peony",
      "longevity": "8-12 hours",
      "category": "female",
      "time_type": "day",
      "image": "url/to/image.jpg",
      "stock": 50,
      "min_price": 350000,
      "max_price": 500000,
      "variants": [
        {
          "id": 1,
          "size": "30ml",
          "price": 350000,
          "stock": 30
        },
        {
          "id": 2,
          "size": "50ml",
          "price": 500000,
          "stock": 20
        }
      ],
      "ratings": {
        "average": 4.5,
        "count": 12,
        "reviews": [ ... ]
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "total": 120,
    "per_page": 12,
    "last_page": 10
  }
}
```

### Get Product Detail
```
GET /products/{id}

Response 200:
{
  "product": {
    "id": 1,
    "name": "Rose Dreams",
    "slug": "rose-dreams",
    "description": "...",
    "notes": "Top: Rose, Middle: Peony, Base: Vanilla",
    "longevity": "8-12 hours",
    "category": "female",
    "time_type": "day",
    "image": "url/to/image.jpg",
    "stock": 50,
    "min_price": 350000,
    "max_price": 500000,
    "variants": [
      {
        "id": 1,
        "size": "30ml",
        "price": 350000,
        "stock": 30
      },
      {
        "id": 2,
        "size": "50ml",
        "price": 500000,
        "stock": 20
      }
    ],
    "ratings": {
      "average": 4.5,
      "count": 12,
      "reviews": [
        {
          "id": 1,
          "user_name": "Jane Doe",
          "rating": 5,
          "comment": "Amazing fragrance!",
          "created_at": "2024-01-15T10:30:00Z"
        }
      ]
    }
  }
}
```

### Create Product (Admin Only)
```
POST /products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Fragrance",
  "description": "A beautiful fragrance",
  "category": "female",
  "time_type": "day",
  "notes": "Top notes...",
  "longevity": "8-12 hours",
  "image": "base64_encoded_image",
  "stock": 100
}

Response 201:
{
  "product": { ... }
}
```

### Update Product (Admin Only)
```
PATCH /products/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "stock": 80
}

Response 200:
{
  "product": { ... }
}
```

### Delete Product (Admin Only)
```
DELETE /products/{id}
Authorization: Bearer {token}

Response 200:
{
  "message": "Product deleted successfully"
}
```

---

## Product Variant Endpoints

### Create Variant
```
POST /products/{id}/variants
Authorization: Bearer {token}
Content-Type: application/json

{
  "size": "75ml",
  "price": 600000,
  "stock": 15
}

Response 201:
{
  "variant": { ... }
}
```

### Update Variant
```
PATCH /products/{id}/variants/{variant_id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "price": 550000,
  "stock": 20
}

Response 200:
{
  "variant": { ... }
}
```

---

## Order Endpoints

### Create Order
```
POST /orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "shipping_address": "123 Main Street, Jakarta",
  "payment_method": "QRIS",
  "items": [
    {
      "variant_id": 1,
      "quantity": 2
    },
    {
      "variant_id": 3,
      "quantity": 1
    }
  ]
}

Response 201:
{
  "message": "Order created successfully",
  "order": {
    "id": 1,
    "order_number": "ORDER-20240115-ABC123",
    "status": "Pending",
    "total": 950000,
    "payment_method": "QRIS"
  }
}
```

### Get User Orders
```
GET /orders?status=Pending&page=1

Query Parameters:
- status: Pending|Packaging|Shipping|Delivered|Cancel (optional)
- page: int (default: 1)

Response 200:
{
  "data": [
    {
      "id": 1,
      "order_number": "ORDER-20240115-ABC123",
      "status": "Pending",
      "shipping_address": "123 Main Street",
      "shipping_number": null,
      "payment_method": "QRIS",
      "payment_status": "pending",
      "subtotal": 700000,
      "shipping_fee": 10000,
      "total": 950000,
      "items": [
        {
          "product_id": 1,
          "product_name": "Rose Dreams",
          "variant_size": "30ml",
          "quantity": 2,
          "unit_price": 350000,
          "total": 700000
        }
      ],
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": { ... }
}
```

### Get Order Detail
```
GET /orders/{id}
Authorization: Bearer {token}

Response 200:
{
  "order": {
    "id": 1,
    "order_number": "ORDER-20240115-ABC123",
    "status": "Shipping",
    "shipping_address": "123 Main Street, Jakarta",
    "shipping_number": "JNE1234567890",
    "payment_method": "QRIS",
    "payment_status": "paid",
    "subtotal": 700000,
    "shipping_fee": 10000,
    "total": 950000,
    "items": [ ... ],
    "created_at": "2024-01-15T10:30:00Z",
    "shipped_at": "2024-01-16T14:22:00Z",
    "delivered_at": null
  }
}
```

### Update Order Status (Admin Only)
```
PATCH /orders/{id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "Shipping",
  "shipping_number": "JNE1234567890"
}

Response 200:
{
  "message": "Order status updated",
  "order": { ... }
}
```

### Cancel Order (User, Packaging status only)
```
POST /orders/{id}/cancel
Authorization: Bearer {token}

Response 200:
{
  "message": "Order cancelled successfully"
}
```

### Mark Order as Delivered (User, Shipping status only)
```
PATCH /orders/{id}/delivered
Authorization: Bearer {token}

Response 200:
{
  "message": "Order marked as delivered"
}
```

---

## Rating/Review Endpoints

### Create Rating
```
POST /ratings
Authorization: Bearer {token}
Content-Type: application/json

{
  "order_item_id": 5,
  "rating": 5,
  "comment": "Amazing fragrance, love it!"
}

Response 201:
{
  "message": "Rating created successfully",
  "rating": {
    "id": 1,
    "user_id": 1,
    "product_id": 1,
    "order_item_id": 5,
    "rating": 5,
    "comment": "Amazing fragrance, love it!",
    "created_at": "2024-01-20T10:30:00Z"
  }
}
```

### Get Product Ratings
```
GET /products/{id}/ratings?page=1

Response 200:
{
  "data": [
    {
      "id": 1,
      "user_name": "Jane Doe",
      "rating": 5,
      "comment": "Amazing fragrance!",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

## Favorite/Wishlist Endpoints

### Toggle Favorite
```
POST /favorites/{product_id}
Authorization: Bearer {token}

Response 200:
{
  "message": "Added to favorites",
  "is_favorite": true
}

// Or if already favorited:
{
  "message": "Removed from favorites",
  "is_favorite": false
}
```

### Get User Favorites
```
GET /favorites?page=1

Response 200:
{
  "data": [
    {
      "id": 1,
      "name": "Rose Dreams",
      ... // Full product object
    }
  ],
  "pagination": { ... }
}
```

---

## Payment Endpoints

### Create QRIS Payment
```
POST /payments/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "order_id": 1,
  "amount": 950000
}

Response 200:
{
  "transaction_id": "mid-123456",
  "snap_token": "token_123456",
  "qr_code_url": "https://api.midtrans.com/qr_code_123456"
}
```

### Handle Midtrans Webhook
```
POST /payments/webhook
Content-Type: application/json

{
  "transaction_id": "mid-123456",
  "status_code": "200",
  "transaction_status": "settlement"
}

Response 200:
{
  "message": "Webhook processed"
}
```

---

## POS (Point of Sale) Endpoints

### Create POS Transaction
```
POST /pos/transactions
Content-Type: application/json

{
  "items": [
    {
      "variant_id": 1,
      "quantity": 2
    },
    {
      "variant_id": 3,
      "quantity": 1
    }
  ],
  "cash_received": 1000000
}

Response 201:
{
  "message": "POS transaction created",
  "transaction": {
    "id": 1,
    "transaction_number": "POS-20240115-ABC123",
    "items": [ ... ],
    "subtotal": 850000,
    "total": 850000,
    "cash_received": 1000000,
    "change": 150000,
    "created_at": "2024-01-15T10:30:00Z"
  },
  "receipt_data": {
    "transaction_number": "POS-20240115-ABC123",
    "date_time": "2024-01-15 10:30:00",
    "items": [ ... ],
    "subtotal": 850000,
    "total": 850000,
    "cash_received": 1000000,
    "change": 150000
  }
}
```

### Get POS Receipt
```
GET /pos/receipt/{transaction_id}

Response 200:
{
  "receipt_data": {
    "transaction_number": "POS-20240115-ABC123",
    "date_time": "2024-01-15 10:30:00",
    "items": [ ... ],
    "subtotal": 850000,
    "total": 850000,
    "cash_received": 1000000,
    "change": 150000
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error",
  "errors": {
    "email": ["The email field is required"],
    "password": ["The password must be at least 8 characters"]
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthenticated"
}
```

### 403 Forbidden
```json
{
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details (only in debug mode)"
}
```

---

## Status Codes Summary

| Code | Meaning |
|------|---------|
| 200 | OK - Successful request |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Permission denied |
| 404 | Not Found - Resource doesn't exist |
| 422 | Unprocessable Entity - Validation failed |
| 500 | Server Error - Internal server error |

---

## Testing with Postman

1. Import environment variables:
   ```json
   {
     "base_url": "http://localhost:8000/api",
     "token": ""
   }
   ```

2. Set token in Postman after login:
   - Copy token from login response
   - Set in `Authorization` tab as `Bearer {token}`

3. Use `{{base_url}}` in request URLs

---

## Frontend Integration Example

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get products
const response = await api.get('/products?category=female&time_type=day');

// Create order
const order = await api.post('/orders', {
  shipping_address: '123 Main St',
  payment_method: 'QRIS',
  items: [{ variant_id: 1, quantity: 2 }],
});
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding:
- 60 requests/minute per IP for public endpoints
- 100 requests/minute per user for protected endpoints
