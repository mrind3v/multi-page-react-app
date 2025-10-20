import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi, userApi } from '../api/productApi';

/**
 * React Query hooks for data fetching with automatic caching
 * This demonstrates caching strategy #2: Server state management with React Query
 * 
 * React Query provides:
 * - Automatic background refetching
 * - Cache invalidation
 * - Optimistic updates
 * - Request deduplication
 */

// Query keys
export const QUERY_KEYS = {
  PRODUCTS: 'products',
  PRODUCT: 'product',
  USER: 'user',
};

/**
 * Hook to fetch all products
 * Cached for 5 minutes (staleTime)
 */
export const useProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: productApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch a single product by ID
 * Cached for 10 minutes
 */
export const useProduct = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: () => productApi.getById(id),
    enabled: !!id, // Only run if id exists
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
  });
};

/**
 * Hook to fetch products by category
 */
export const useProductsByCategory = (category) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, 'category', category],
    queryFn: () => productApi.getByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to create a new product
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
  });
};

/**
 * Hook to update a product
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, product }) => productApi.update(id, product),
    onSuccess: (data, variables) => {
      // Invalidate specific product and products list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCT, variables.id] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
  });
};

/**
 * Hook to delete a product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
  });
};

/**
 * Hook to fetch user profile
 */
export const useUser = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, id],
    queryFn: () => userApi.getById(id),
    enabled: !!id,
    staleTime: 15 * 60 * 1000, // 15 minutes - user data changes less frequently
  });
};

/**
 * Hook to update user profile
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, user }) => userApi.update(id, user),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER, variables.id] });
    },
  });
};
