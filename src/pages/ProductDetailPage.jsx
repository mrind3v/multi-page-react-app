import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import useProductStore from '../store/useProductStore';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(id);
  const { favorites, addFavorite, removeFavorite } = useProductStore();
  
  const isFavorite = favorites.includes(parseInt(id));
  
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(parseInt(id));
    } else {
      addFavorite(parseInt(id));
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <svg className="h-16 w-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }
  
  if (!product) return null;
  
  const getCategoryColor = (category) => {
    const colors = {
      Electronics: 'bg-blue-100 text-blue-800',
      Wearables: 'bg-purple-100 text-purple-800',
      Furniture: 'bg-green-100 text-green-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };
  
  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: '❌' };
    if (stock < 15) return { text: 'Low Stock', color: 'bg-orange-100 text-orange-800', icon: '⚠️' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-800', icon: '✅' };
  };
  
  const stockStatus = getStockStatus(product.stock);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
        
        {/* Product Detail */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 flex items-center justify-center">
              <div className="text-9xl">
                {product.category === 'Electronics' && '💻'}
                {product.category === 'Wearables' && '⌚'}
                {product.category === 'Furniture' && '🪑'}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(product.category)} mb-3`}>
                    {product.category}
                  </span>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                </div>
                <button
                  onClick={toggleFavorite}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                >
                  <svg
                    className={`h-7 w-7 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    fill={isFavorite ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-5xl font-bold text-gray-900 mb-2">${product.price}</p>
                <span className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${stockStatus.color}`}>
                  <span>{stockStatus.icon}</span>
                  {stockStatus.text}
                </span>
              </div>
              
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Product ID</p>
                    <p className="text-lg font-semibold text-gray-900">#{product.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Available Stock</p>
                    <p className="text-lg font-semibold text-gray-900">{product.stock} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <p className="text-lg font-semibold text-gray-900">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Value</p>
                    <p className="text-lg font-semibold text-gray-900">${(product.price * product.stock).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  disabled={product.stock === 0}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                    product.stock === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                
                <button
                  onClick={() => navigate('/products')}
                  className="w-full py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-lg"
                >
                  Back to Products
                </button>
              </div>
              
              {/* Cache Info */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">💡 Caching:</span> This product data is cached by React Query for 10 minutes. 
                  Navigate away and come back to see instant loading!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            This is a high-quality {product.name} from our {product.category} collection. 
            Perfect for both personal and professional use. With {product.stock} units currently in stock, 
            this product offers excellent value at ${product.price}.
          </p>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3">Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Premium quality materials and construction
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Fast and reliable shipping
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              30-day money-back guarantee
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              24/7 customer support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
