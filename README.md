# Elite Enterprise

> A dynamic business platform built with modern technologies, ensuring innovation, reliability, and excellence.

**Live Demo:** [theeliteenterprise.in](https://theeliteenterprise.in)

---

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Development Guide](#development-guide)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Elite Enterprise is a comprehensive business platform designed to provide seamless e-commerce and enterprise management solutions. The platform combines a modern React-based frontend with a robust PHP backend and MySQL database, delivering a scalable and performant solution for business operations.

### Core Objectives

- Provide a user-friendly shopping experience for customers
- Enable efficient administrative management of products, orders, and inventory
- Support multiple brands and product categories with detailed management capabilities
- Facilitate secure user authentication and account management
- Streamline order processing and payment integration
- Deliver promotional campaigns through coupons and strategic placement

---

## Technology Stack

### Frontend
- **Framework:** React 18.2.0
- **Styling:** CSS, Bootstrap 5.3.2, Sass
- **State Management:** Redux with Redux Thunk middleware
- **Routing:** React Router DOM 6.21.2
- **UI Components:** React Bootstrap, React Icons, React Select
- **Animations:** Framer Motion, React Spring, AOS (Animate On Scroll)
- **Rich Text Editor:** React Simple WYSIWYG
- **Carousels:** React Slick with Slick Carousel
- **Utilities:** Axios, Crypto-JS, DOMPurify, JS-Cookie

### Backend
- **Language:** PHP
- **Database:** MySQL
- **Server:** Apache/Compatible PHP Server
- **Payment Gateway:** Razorpay Integration

### Additional Tools
- **Build Tool:** React Scripts
- **Testing:** Jest, React Testing Library
- **Security:** Password encryption, JWT tokens, Session management

---

## Key Features

### Customer Features

#### Shopping Experience
- Comprehensive product catalog with advanced filtering
- Brand and sub-brand categorization
- Product search functionality with results pagination
- Single product detailed view with specifications
- Shopping cart with real-time updates
- Wishlist management (if applicable)
- Product reviews and ratings

#### Account Management
- User registration and secure login
- Email-based password recovery
- Profile management and account details
- Multiple address management
- Order history and tracking
- Address book with default address support

#### Checkout & Payment
- Multi-step checkout process
- Address verification and selection
- Coupon and discount code application
- Razorpay payment gateway integration
- Order summary and confirmation
- Payment status tracking

#### Additional Features
- Blog section for content marketing
- Newsletter subscription capabilities
- About Us and company information pages
- Contact forms with inquiry submission
- Policy pages (Privacy, Terms, Shipping, Refund)
- Zip code availability checking for delivery

### Administrative Features

#### Dashboard
- Real-time statistics displaying:
  - Total active users
  - Product inventory count
  - Brand and sub-brand management
  - Orders summary
  - Coupon and promotional data
  - Available delivery zones (zip codes)
  - Banner and carousel management
  - Published blog posts

#### Content Management
- Product management (CRUD operations)
- Brand and sub-brand administration
- Product variations, sizes, and attributes
- Banner and slider image management
- Blog post creation and publishing
- Homepage content curation

#### Operational Management
- Order management and status updates
- Coupon and promotional code creation
- Delivery zone (zip code) management
- User management and access control
- System logs and error monitoring

---

## Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────────┐
│         Frontend Layer                   │
│   (React.js - User Interface)           │
└──────────────┬──────────────────────────┘
               │ API Calls (HTTP/AJAX)
┌──────────────▼──────────────────────────┐
│     Application Layer                    │
│  (PHP Backend - Business Logic)         │
│  - Authentication & Authorization       │
│  - Order Processing                     │
│  - Payment Handling                     │
│  - Data Validation                      │
└──────────────┬──────────────────────────┘
               │ Database Queries
┌──────────────▼──────────────────────────┐
│       Data Layer                         │
│     (MySQL Database)                    │
│   - User Data                           │
│   - Products & Inventory                │
│   - Orders & Transactions               │
│   - Configurations                      │
└─────────────────────────────────────────┘
```

### Data Flow

1. **Frontend Request:** User interacts with React interface
2. **API Call:** Request sent via Axios to PHP backend
3. **Backend Processing:** PHP validates and processes the request
4. **Database Operation:** Data is queried or updated in MySQL
5. **Response:** Backend returns JSON response
6. **State Update:** Redux manages frontend state
7. **UI Render:** React components re-render with updated data

---

## Project Structure

### Frontend Structure

```
src/
├── components/           # Reusable React components
│   ├── Home/            # Homepage components
│   ├── Shoppages/       # Product browsing pages
│   ├── Brandspage/      # Brand showcase pages
│   ├── Blog/            # Blog components
│   ├── Account/         # User account pages
│   ├── Cart/            # Shopping cart components
│   ├── Checkoutform/    # Checkout process
│   ├── Login&signup/    # Authentication pages
│   ├── Contact/         # Contact form
│   ├── About/           # About page
│   └── FooterPagesComponents/  # Policy pages
├── layout/              # Layout components
│   ├── Navbar.js        # Navigation bar
│   ├── Footer.js        # Footer section
│   ├── Bottombar.js     # Bottom navigation
│   └── Sidebar.js       # Sidebar menu
├── actions/             # Redux action creators
├── reducers/            # Redux reducers
├── Images/              # Static image assets
├── ApiContext.js        # API context provider
├── AuthContext.js       # Authentication context
├── App.js              # Main app component
├── index.js            # Entry point
├── store.js            # Redux store configuration
├── Globalvarible.js    # Global constants
└── style.css           # Global styles
```

### Backend Structure

```
public/
├── _API/                # RESTful API endpoints
│   ├── config.php       # Database configuration
│   ├── Login.php        # User login
│   ├── Signup.php       # User registration
│   ├── ForgetPassword.php # Password recovery
│   ├── Shop.php         # Product listing
│   ├── Brands.php       # Brand management
│   ├── BrandsProduct.php # Brand products
│   ├── SubBrandsProduts.php # Sub-brand products
│   ├── Add_CartDetails.php # Add to cart
│   ├── Get_CartDetails.php # Retrieve cart
│   ├── Update_CartDetails.php # Update cart
│   ├── Get_UserDetails.php # User information
│   ├── Update_UserDetails.php # Profile updates
│   ├── Add_addresess.php # Add delivery address
│   ├── Get_addresess.php # Retrieve addresses
│   ├── DeleteAddress.php # Remove address
│   ├── PlaceOrder.php   # Order creation
│   ├── GetOrderDetails.php # Order retrieval
│   ├── CheckCopun.php   # Coupon validation
│   ├── GetBlogs.php     # Blog retrieval
│   ├── BlogsPost.php    # Blog publishing
│   ├── Home_Slider_Images_API.php # Banner management
│   ├── Add_BannerImage_api.php # Add banners
│   ├── CheckZipAvailability.php # Delivery zone check
│   └── [More API files]
│
├── admin/               # Administrative panel
│   ├── index.php        # Admin dashboard
│   ├── login.php        # Admin authentication
│   ├── logout.php       # Admin logout
│   ├── adminHeader.php  # Admin header
│   ├── sidebar.php      # Admin sidebar
│   ├── config/          # Admin configuration
│   ├── controller/      # Business logic controllers
│   ├── adminView/       # Admin view templates
│   ├── assets/          # Admin CSS/JS files
│   └── images/          # Admin images
│
├── _redirects           # URL redirects configuration
├── index.html           # HTML entry point
├── manifest.json        # PWA manifest
├── robots.txt          # SEO robots file
└── favicon.ico         # Site favicon
```

---

## Installation & Setup

### Prerequisites

- Node.js 14+ and npm
- PHP 7.4+
- MySQL 5.7+
- Apache/Nginx Web Server

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/BhanuPrakashPandey0843/Elite-Enterprise.git
cd Elite-Enterprise

# Install dependencies
npm install

# Set global API base URL
# Edit src/Globalvarible.js
export const baseUrl = "https://your-api-endpoint/public/_API/";

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
# Navigate to backend directory
cd public/_API

# Database configuration
# Edit config.php with your MySQL credentials
<?php
$servername = "your_host";
$username = "your_username";
$password = "your_password";
$dbname = "Elite_Enterprise";

$conn = new mysqli($servername, $username, $password, $dbname);
?>

# Create database
mysql -u your_username -p < ../../u517997350_Elite.sql

# Ensure PHP server is running
# If using built-in server:
php -S localhost:8000
```

### Admin Panel Access

Navigate to `http://localhost:8000/public/admin/` and log in with admin credentials.

---

## API Documentation

### Base URL
```
{baseUrl} = https://theeliteenterprise.in/public/_API/
```

### Authentication

Most endpoints require user authentication via JWT tokens stored in cookies or session.

### Core API Endpoints

#### User Management
```
POST   /Login.php              - User login
POST   /Signup.php             - User registration
POST   /ForgetPassword.php     - Password reset
GET    /Get_UserDetails.php    - Retrieve user profile
POST   /Update_UserDetails.php - Update user information
```

#### Products & Catalog
```
GET    /Shop.php               - Get all products
GET    /Brands.php             - Get all brands
GET    /BrandsProduct.php      - Get products by brand
GET    /SubBrandsProduts.php   - Get sub-brand products
```

#### Shopping Cart
```
POST   /Add_CartDetails.php    - Add item to cart
GET    /Get_CartDetails.php    - Retrieve cart items
POST   /Update_CartDetails.php - Update cart quantity
```

#### Addresses
```
POST   /Add_addresess.php      - Add delivery address
GET    /Get_addresess.php      - Retrieve user addresses
POST   /DeleteAddress.php      - Remove address
```

#### Orders
```
POST   /PlaceOrder.php         - Create new order
GET    /GetOrderDetails.php    - Retrieve order details
```

#### Promotions
```
POST   /CheckCopun.php         - Validate coupon code
```

#### Content
```
GET    /GetBlogs.php           - Retrieve blog posts
POST   /BlogsPost.php          - Publish blog post
```

#### Delivery Zones
```
POST   /CheckZipAvailability.php - Check delivery availability

```

### Request/Response Format

**Request:**
```json
{
  "method": "POST",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  "body": {
    "user_id": "12345",
    "product_id": "789"
  }
}
```

**Response:**
```json
{
  "status": true,
  "message": "Operation successful",
  "data": []
}
```

---

## Database Schema

### Key Tables

#### UserDetails
- `user_id` (Primary Key)
- `email`
- `password` (encrypted)
- `first_name`
- `last_name`
- `phone`
- `created_at`
- `updated_at`

#### Products
- `product_id` (Primary Key)
- `product_name`
- `description`
- `price`
- `brand_id` (Foreign Key)
- `category_id`
- `stock_quantity`
- `image_url`
- `created_at`

#### Orders
- `order_id` (Primary Key)
- `user_id` (Foreign Key)
- `order_date`
- `total_amount`
- `status`
- `payment_status`
- `shipping_address_id`

#### Brands
- `brand_id` (Primary Key)
- `brand_name`
- `description`
- `logo_url`

#### Brands_Subcat (Sub-brands)
- `subcat_id` (Primary Key)
- `brand_id` (Foreign Key)
- `subcat_name`

#### Copuns (Coupons)
- `coupon_id` (Primary Key)
- `coupon_code`
- `discount_percent`
- `valid_from`
- `valid_to`
- `usage_limit`

#### AvalableZipCodes
- `zipcode_id` (Primary Key)
- `zipcode`
- `delivery_days`

#### Blogs
- `blog_id` (Primary Key)
- `title`
- `content`
- `author_id`
- `publish_date`
- `featured_image`

---

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://theeliteenterprise.in/public/_API/
REACT_APP_RAZORPAY_KEY=your_razorpay_key
REACT_APP_ENVIRONMENT=production
```

### API Configuration

Edit `public/_API/config.php`:

```php
<?php
$servername = "localhost";
$username = "db_user";
$password = "db_password";
$dbname = "u517997350_Elite";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
?>
```

### Payment Gateway Setup

Configure Razorpay credentials in relevant API endpoints:

```php
// In PlaceOrder.php
$razorpay_key = "your_razorpay_key";
$razorpay_secret = "your_razorpay_secret";
```

---

## Development Guide

### Adding New Features

#### 1. Creating a New Component

```javascript
// src/components/NewFeature/NewFeature.js
import React, { useEffect, useState } from 'react';
import { useApi } from '../../ApiContext';
import './NewFeature.css';

const NewFeature = () => {
  const { handleCheckCoupon } = useApi();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data on component mount
  }, []);

  return (
    <div className="new-feature">
      {/* Component JSX */}
    </div>
  );
};

export default NewFeature;
```

#### 2. Adding API Endpoint

```php
// public/_API/NewEndpoint.php
<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = $_POST;
    
    // Validate input
    if (!isset($input['required_field'])) {
        echo json_encode(['status' => false, 'message' => 'Missing required field']);
        exit;
    }
    
    // Process request
    $query = "SELECT * FROM table WHERE condition = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $input['field']);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(['status' => true, 'data' => $result->fetch_all(MYSQLI_ASSOC)]);
    } else {
        echo json_encode(['status' => false, 'message' => 'No data found']);
    }
}
?>
```

### Code Style Guidelines

- **JavaScript/React:** Follow ES6+ standards, use functional components with hooks
- **PHP:** Use prepared statements to prevent SQL injection, validate all inputs
- **CSS:** Use BEM naming convention, maintain responsive design
- **Comments:** Add meaningful comments for complex logic

### Building for Production

```bash
# Build React app
npm run build

# Output will be in the build/ directory
# Deploy build/ contents to your web server
```

---

## Deployment

### Frontend Deployment (Netlify/Vercel)

```bash
# Build the production bundle
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### Backend Deployment

1. **Prepare PHP files** on your hosting server
2. **Configure database** with proper credentials
3. **Set up SSL certificates** for HTTPS
4. **Configure .htaccess** for URL rewriting:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

5. **Set file permissions:**
```bash
chmod 755 public/_API/
chmod 755 public/admin/
chmod 644 public/_API/*.php
```

### Database Backup & Maintenance

```bash
# Backup database
mysqldump -u username -p database_name > backup.sql

# Restore database
mysql -u username -p database_name < backup.sql
```

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Review Process

- All PRs require at least one approval
- Ensure all tests pass before merging
- Update documentation for any new features
- Follow the existing code style and conventions

---

## License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

---

## Support & Contact

For questions, issues, or support:

- **Website:** [theeliteenterprise.in](https://theeliteenterprise.in)
- **Email:** support@theeliteenterprise.in
- **GitHub Issues:** [Report Issues](https://github.com/BhanuPrakashPandey0843/Elite-Enterprise/issues)

---

## Changelog

### Version 1.0.0 (Initial Release)
- Complete e-commerce platform with user authentication
- Product catalog with brand management
- Shopping cart and checkout system
- Razorpay payment integration
- Admin dashboard for content management
- Blog functionality
- Coupon and promotional features

---

**Built with ✨ by Bhanu Prakash Pandey**
