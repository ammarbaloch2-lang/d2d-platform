# D2D Platform - Demo Credentials

## Login Access

The D2D platform uses demo authentication for testing. Here are the available credentials:

### Admin Account
- **Email:** `admin@d2d.com`
- **Password:** `admin123`
- **Access:** Full admin dashboard with all features
- **Redirects to:** `/admin` after login

### Tour Operator Account
- **Email:** `operator@d2d.com`
- **Password:** `operator123`
- **Access:** Admin dashboard with tour management features
- **Redirects to:** `/admin` after login

### Regular User Account
- **Email:** `user@example.com`
- **Password:** `user123`
- **Access:** Standard user features (booking tours, viewing profile)
- **Redirects to:** `/` (homepage) after login

## How to Login

1. Navigate to: http://localhost:3000/auth/login
2. Enter one of the credential sets above
3. Click "Sign In"
4. You'll be redirected based on your role

## Features by Role

### Admin
- View all bookings
- Manage tours
- Manage users
- View financial reports
- Full dashboard access

### Tour Operator
- View own bookings
- Manage own tours
- View own earnings
- Dashboard access

### Regular User
- Browse tours
- Make bookings
- View booking history
- Write reviews

## Important Notes

⚠️ **SECURITY WARNING**: These are demo credentials for development only!

- Passwords are stored in plain text
- No real authentication or encryption
- Not suitable for production use
- All data is stored in browser localStorage
- Credentials are visible in the login page

## Production Deployment

Before deploying to production, you MUST:

1. Implement proper authentication (JWT, OAuth, etc.)
2. Use a database for user storage (PostgreSQL, MongoDB)
3. Hash passwords with bcrypt or similar
4. Implement proper session management
5. Add rate limiting and security headers
6. Use environment variables for sensitive data
7. Remove demo credentials from the codebase

## Quick Access Links

- **Login Page:** http://localhost:3000/auth/login
- **Admin Dashboard:** http://localhost:3000/admin
- **Homepage:** http://localhost:3000
- **Tours Listing:** http://localhost:3000/tours
