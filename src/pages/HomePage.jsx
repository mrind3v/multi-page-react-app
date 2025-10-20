import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const HomePage = () => {
  const { data: products, isLoading, error } = useProducts();
  
  const stats = products ? {
    total: products.length,
    inStock: products.filter(p => p.stock > 0).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock < 15).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
  } : null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Product Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your inventory with powerful caching strategies
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/products"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Browse Products
            </Link>
            <Link
              to="/profile"
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              View Profile
            </Link>
          </div>
        </div>
        
        {/* Stats Section */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
            <p className="text-red-600 font-medium">Error loading stats: {error.message}</p>
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">In Stock</p>
                  <p className="text-3xl font-bold text-green-600">{stats.inStock}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Low Stock</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.lowStock}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Value</p>
                  <p className="text-3xl font-bold text-purple-600">${stats.totalValue.toLocaleString()}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        
        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Caching Strategies Implemented
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-blue-200 rounded-lg p-6 hover:border-blue-400 transition-colors duration-200">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">React Query</h3>
              </div>
              <p className="text-gray-600">
                Automatic background refetching, cache invalidation, and optimistic updates for server state management.
              </p>
            </div>
            
            <div className="border-2 border-purple-200 rounded-lg p-6 hover:border-purple-400 transition-colors duration-200">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Zustand + localStorage</h3>
              </div>
              <p className="text-gray-600">
                Client-side state management with localStorage persistence for favorites and user preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
