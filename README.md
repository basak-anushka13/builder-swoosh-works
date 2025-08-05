# RuralConnect - Rural Community Platform

A full-stack web application designed to help rural communities easily find and access essential products like groceries, medicines, and daily necessities through a reliable delivery platform.

## 🚀 Live Demo

**Demo URL:** [https://a1ff6a91e0624dda8600d7852936cd31-d91a8a5ab1b041d29f03a7371.fly.dev](https://a1ff6a91e0624dda8600d7852936cd31-d91a8a5ab1b041d29f03a7371.fly.dev)

**Demo Login Credentials:**
- Create a new account via the signup page, or
- Use any email with any password (demo authentication is permissive)

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router 6** for SPA routing
- **Tailwind CSS 3** for styling
- **React Context API** for state management
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Zod** for validation
- **In-memory storage** (simulating database operations)

### Development & Build
- **Vite** development server with HMR
- **TypeScript** compilation
- **ESLint** and **Prettier** for code quality

## ✨ Features Implemented

### 🏠 Homepage
- **Responsive Navigation** with mobile menu
- **Hero Section** with call-to-action buttons
- **Services Section** - 6 key services with icons and descriptions
- **Products Section** - Featured products with add-to-cart functionality
- **News & Updates** - 3 relevant news articles for rural communities
- **Contact Form** - Working contact form with backend integration
- **Professional Footer** with branding

### 🔐 Authentication System
- **User Registration** with form validation
- **User Login** with remember me option
- **Password visibility toggle**
- **Token-based authentication**
- **Protected routes** and redirects

### 👤 User Dashboard
- **Welcome message** with personalized greeting
- **Order history** showing past bookings with status
- **Profile management** with editable user information
- **Quick action buttons** for easy navigation

### 🛒 E-commerce Features
- **Shopping Cart** with slide-out panel
- **Add/Remove products** with quantity controls
- **Cart persistence** across page reloads
- **Checkout flow** with login requirement
- **Cart icon** with live item count in navigation

### 🔍 Product Management
- **Dedicated Products Page** with grid layout
- **Search functionality** across product names and descriptions
- **Category filtering** (Grains, Dairy, Healthcare, etc.)
- **Product details** with pricing and stock status
- **Responsive product cards**

### 📱 Responsive Design
- **Mobile-first approach** with breakpoint optimization
- **Touch-friendly interface** for mobile devices
- **Collapsible navigation** for smaller screens
- **Adaptive layouts** for tablets and desktops

## 🔗 API Endpoints

### Public Endpoints
- `GET /api/services` - List all available services
- `GET /api/products` - Get products with optional search/filter
- `GET /api/news` - Fetch news articles
- `POST /api/contact` - Submit contact form
- `POST /api/register` - User registration
- `POST /api/login` - User authentication

### Response Examples

**GET /api/products**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Organic Rice",
      "price": "₹45/kg",
      "category": "Grains",
      "description": "Premium quality organic rice from local farms",
      "inStock": true
    }
  ]
}
```

**POST /api/register**
```json
{
  "token": "token_1_1703875200000",
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "address": "Village ABC, District XYZ"
  }
}
```

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rural-community-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Build for Production

```bash
# Build both client and server
npm run build

# Start production server
npm start
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking
- `npm test` - Run test suite

## 📋 Project Structure

```
├── client/                 # Frontend React application
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Pre-built component library
│   │   └── Cart.tsx      # Shopping cart component
│   ├── contexts/         # React Context providers
│   │   └── CartContext.tsx # Shopping cart state management
│   ├── pages/            # Route components
│   │   ├── Index.tsx     # Homepage
│   │   ├── Products.tsx  # Products listing page
│   │   ├── Login.tsx     # Authentication page
│   │   ├── Signup.tsx    # Registration page
│   │   └── Dashboard.tsx # User dashboard
│   ├── App.tsx           # Main app component with routing
│   └── global.css        # Global styles and Tailwind config
├── server/               # Backend Express application
│   ├── routes/          # API route handlers
│   │   ├── auth.ts      # Authentication endpoints
│   │   ├── products.ts  # Product management
│   │   ├── services.ts  # Services listing
│   │   ├── news.ts      # News articles
│   │   └── contact.ts   # Contact form handling
│   └── index.ts         # Express server setup
├── shared/              # Shared TypeScript interfaces
│   └── api.ts          # API type definitions
└── package.json        # Dependencies and scripts
```

## 🎯 Assignment Requirements Coverage

### ✅ Homepage UI Requirements
- [x] Attractive homepage with navbar (Logo, Home, Services, Products, Contact)
- [x] "Our Services" section with 6 services (name + icon)
- [x] "Available Products" section with 6+ products (name + price + icon)
- [x] "News & Updates" section with 3 relevant news headlines
- [x] "Contact Us" section with address, helpline & working form
- [x] Fully responsive design (mobile and desktop)

### ✅ User Features Requirements
- [x] Complete signup/login flow with forms
- [x] Users stored in backend database simulation
- [x] User dashboard with welcome message
- [x] List of existing bookings/orders
- [x] Profile editing functionality

### ✅ Backend API Requirements
- [x] `GET /services` - List of service types
- [x] `GET /products` - Products with details and filtering
- [x] `POST /register` - User registration
- [x] `POST /login` - User authentication
- [x] `GET /news` - News headlines
- [x] `POST /contact` - Contact form submissions

### ✅ Booking & Extra Features
- [x] Shopping cart for logged-in users
- [x] Add products to cart with quantity management
- [x] Bookings saved and displayed on dashboard
- [x] Product search and filtering functionality
- [x] User profile editing capabilities

## 🌟 Additional Features

Beyond the assignment requirements, this project includes:

- **Professional Branding** - "RuralConnect" with nature-inspired design
- **Advanced UI/UX** - Modern, accessible interface with smooth animations
- **Error Handling** - Comprehensive error states and user feedback
- **Loading States** - Skeleton screens and loading indicators
- **Cart Management** - Persistent shopping cart with real-time updates
- **Mobile Optimization** - Touch-friendly interface for rural users
- **Type Safety** - Full TypeScript implementation for reliability

## 🤝 Contributing

This project was built as part of a Full Stack Internship assignment. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support regarding this rural community platform:

- **Contact Form**: Use the contact form on the website
- **Email**: Available through the platform
- **Phone**: +91 9876543210 (Demo helpline)

## 📝 License

This project is built for educational and community development purposes.

---

**Built with ❤️ for rural communities** - Empowering access to essential services and products.
