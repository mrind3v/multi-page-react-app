import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand store with localStorage persistence
 * This demonstrates caching strategy #1: Client-side state management with persistence
 */
const useProductStore = create(
  persist(
    (set, get) => ({
      // State
      products: [],
      selectedProduct: null,
      favorites: [],
      lastFetch: null,
      
      // Actions
      setProducts: (products) => set({ 
        products, 
        lastFetch: Date.now() 
      }),
      
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      
      addFavorite: (productId) => set((state) => ({
        favorites: [...new Set([...state.favorites, productId])]
      })),
      
      removeFavorite: (productId) => set((state) => ({
        favorites: state.favorites.filter(id => id !== productId)
      })),
      
      isFavorite: (productId) => {
        return get().favorites.includes(productId);
      },
      
      clearProducts: () => set({ 
        products: [], 
        selectedProduct: null,
        lastFetch: null 
      }),
      
      // Check if cache is stale (older than 5 minutes)
      isCacheStale: () => {
        const { lastFetch } = get();
        if (!lastFetch) return true;
        const FIVE_MINUTES = 5 * 60 * 1000;
        return Date.now() - lastFetch > FIVE_MINUTES;
      },
    }),
    {
      name: 'product-storage', // localStorage key
      partialize: (state) => ({ 
        favorites: state.favorites,
        // We persist favorites but not products to demonstrate different caching strategies
      }),
    }
  )
);

export default useProductStore;
