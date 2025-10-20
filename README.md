# Multi-Page React Product Dashboard

A modern React application demonstrating routing, data fetching, and multiple frontend caching strategies.

## Features

- **Multi-page routing** with React Router DOM
- **Mock REST API** using json-server
- **Multiple caching strategies**:
  - React Query (TanStack Query) for server state management
  - Zustand + localStorage for persistent client state
  - sessionStorage for session-specific preferences
- **Beautiful UI** with Tailwind CSS
- **Responsive design** that works on all devices

## Pages

1. **Home** - Dashboard with statistics and overview
2. **Products** - Browse all products with search and filtering
3. **Product Detail** - Detailed view of individual products
4. **Profile** - User profile management with sessionStorage preferences
5. **Settings** - Cache management and statistics

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **TanStack Query (React Query)** - Server state management
- **Zustand** - Client state management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **json-server** - Mock REST API

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

You need to run TWO servers:

### 1. Start the Mock API Server (Terminal 1)
```bash
npm run api
```
This starts json-server on `http://localhost:3001`

### 2. Start the React Development Server (Terminal 2)
```bash
npm run dev
```
This starts Vite dev server on `http://localhost:5173`

Then open your browser and navigate to `http://localhost:5173`

## Caching Strategies Implemented

### 1. React Query (TanStack Query)
**Location**: `src/hooks/useProducts.js`

- Automatic background refetching
- Cache invalidation on mutations
- Request deduplication
- Optimistic updates
- Configurable stale times:
  - Products: 5 minutes
  - Product details: 10 minutes
  - User data: 15 minutes

**Example**:
```javascript
const { data, isLoading, error } = useProducts();
```

### 2. Zustand + localStorage
**Location**: `src/store/useProductStore.js`

- Persistent client-side state
- Favorites stored in localStorage
- Survives page refreshes
- Automatic synchronization

**Example**:
```javascript
const { favorites, addFavorite, removeFavorite } = useProductStore();
```

### 3. sessionStorage
**Location**: `src/pages/ProfilePage.jsx`

- Session-specific preferences
- Theme settings
- Notification preferences
- Cleared when browser tab closes

**Example**:
```javascript
sessionStorage.setItem('userPreferences', JSON.stringify(preferences));
```

## Project Structure

```
src/
├── api/
│   └── productApi.js          # API service layer with axios
├── components/
│   ├── Navbar.jsx             # Navigation component
│   └── ProductCard.jsx        # Reusable product card
├── hooks/
│   └── useProducts.js         # React Query hooks
├── pages/
│   ├── HomePage.jsx           # Dashboard page
│   ├── ProductsPage.jsx       # Products listing
│   ├── ProductDetailPage.jsx # Product details
│   ├── ProfilePage.jsx        # User profile
│   └── SettingsPage.jsx       # Settings & cache management
├── store/
│   └── useProductStore.js     # Zustand store
├── App.jsx                    # Main app with routing
└── main.jsx                   # Entry point with providers
```

## Key Features

### Routing
- Client-side routing with React Router
- Dynamic routes (`/products/:id`)
- Active link highlighting
- Programmatic navigation

### Data Fetching
- GET requests for products and users
- POST/PUT/DELETE mutations
- Error handling
- Loading states

### Caching
- **React Query**: Automatic caching with configurable stale times
- **localStorage**: Persistent favorites across sessions
- **sessionStorage**: Temporary preferences for current session
- Cache statistics and management in Settings page

### UI/UX
- Responsive design with Tailwind CSS
- Loading skeletons
- Error states with retry functionality
- Toast notifications
- Gradient backgrounds
- Smooth transitions and animations

## API Endpoints

The mock API (`db.json`) provides:

- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `GET /products?category=Electronics` - Filter by category
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product
- `GET /users` - Get all users
- `GET /users/:id` - Get single user
- `PUT /users/:id` - Update user

## Cache Management

Visit the **Settings** page to:
- View cache statistics
- Clear React Query cache
- Clear localStorage
- Clear sessionStorage
- Clear all caches at once

