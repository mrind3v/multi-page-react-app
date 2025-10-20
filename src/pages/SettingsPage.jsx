import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useProductStore from '../store/useProductStore';

/**
 * SettingsPage demonstrates cache management and clearing
 */
const SettingsPage = () => {
  const queryClient = useQueryClient();
  const { clearProducts, favorites } = useProductStore();
  
  const [localStorageSize, setLocalStorageSize] = useState(0);
  const [sessionStorageSize, setSessionStorageSize] = useState(0);
  const [reactQueryCacheSize, setReactQueryCacheSize] = useState(0);
  
  useEffect(() => {
    calculateStorageSizes();
  }, []);
  
  const calculateStorageSizes = () => {
    // Calculate localStorage size
    let localSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localSize += localStorage[key].length + key.length;
      }
    }
    setLocalStorageSize(localSize);
    
    // Calculate sessionStorage size
    let sessionSize = 0;
    for (let key in sessionStorage) {
      if (sessionStorage.hasOwnProperty(key)) {
        sessionSize += sessionStorage[key].length + key.length;
      }
    }
    setSessionStorageSize(sessionSize);
    
    // Get React Query cache info
    const cache = queryClient.getQueryCache();
    setReactQueryCacheSize(cache.getAll().length);
  };
  
  const clearReactQueryCache = () => {
    queryClient.clear();
    setReactQueryCacheSize(0);
    alert('React Query cache cleared successfully!');
  };
  
  const clearLocalStorage = () => {
    localStorage.clear();
    setLocalStorageSize(0);
    alert('localStorage cleared successfully!');
  };
  
  const clearSessionStorage = () => {
    sessionStorage.clear();
    setSessionStorageSize(0);
    alert('sessionStorage cleared successfully!');
  };
  
  const clearAllCaches = () => {
    queryClient.clear();
    localStorage.clear();
    sessionStorage.clear();
    clearProducts();
    calculateStorageSizes();
    alert('All caches cleared successfully!');
  };
  
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 mb-8">Manage your application settings and cache</p>
        
        {/* Cache Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cache Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-blue-900">React Query Cache</h3>
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-blue-900 mb-1">{reactQueryCacheSize}</p>
              <p className="text-sm text-blue-700">cached queries</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-purple-900">localStorage</h3>
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-purple-900 mb-1">{formatBytes(localStorageSize)}</p>
              <p className="text-sm text-purple-700">{favorites.length} favorites</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-green-900">sessionStorage</h3>
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-green-900 mb-1">{formatBytes(sessionStorageSize)}</p>
              <p className="text-sm text-green-700">session data</p>
            </div>
          </div>
        </div>
        
        {/* Cache Management */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cache Management</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Clear React Query Cache</h3>
                <p className="text-sm text-gray-600">Remove all cached API responses from React Query</p>
              </div>
              <button
                onClick={clearReactQueryCache}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Clear
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Clear localStorage</h3>
                <p className="text-sm text-gray-600">Remove favorites and persistent data</p>
              </div>
              <button
                onClick={clearLocalStorage}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
              >
                Clear
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Clear sessionStorage</h3>
                <p className="text-sm text-gray-600">Remove session-specific preferences</p>
              </div>
              <button
                onClick={clearSessionStorage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                Clear
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Clear All Caches</h3>
                <p className="text-sm text-gray-600">Remove all cached data from the application</p>
              </div>
              <button
                onClick={clearAllCaches}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
        
        {/* Caching Strategies Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Implemented Caching Strategies</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. React Query (TanStack Query)</h3>
              <p className="text-gray-600 mb-2">
                Server state management with automatic background refetching, cache invalidation, and request deduplication.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Products cached for 5 minutes (staleTime)</li>
                <li>Product details cached for 10 minutes</li>
                <li>User data cached for 15 minutes</li>
                <li>Automatic refetch on window focus</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Zustand + localStorage</h3>
              <p className="text-gray-600 mb-2">
                Client-side state management with localStorage persistence for user-specific data.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Favorites persisted across browser sessions</li>
                <li>Automatic synchronization with localStorage</li>
                <li>Lightweight and performant state management</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. sessionStorage</h3>
              <p className="text-gray-600 mb-2">
                Session-specific caching for temporary user preferences and settings.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>User preferences cached for current session</li>
                <li>Cleared when browser tab is closed</li>
                <li>Perfect for temporary UI state</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
