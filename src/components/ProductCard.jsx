import { Link } from 'react-router-dom';
import useProductStore from '../store/useProductStore';

const ProductCard = ({ product }) => {
  const { favorites, addFavorite, removeFavorite } = useProductStore();
  const isFavorite = favorites.includes(product.id);
  
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };
  
  const getCategoryColor = (category) => {
    const colors = {
      Electronics: 'bg-blue-100 text-blue-800',
      Wearables: 'bg-purple-100 text-purple-800',
      Furniture: 'bg-green-100 text-green-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };
  
  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600' };
    if (stock < 15) return { text: 'Low Stock', color: 'text-orange-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  };
  
  const stockStatus = getStockStatus(product.stock);
  
  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 hover:border-blue-400">
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8">
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 z-10"
          >
            <svg
              className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
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
          
          <div className="flex items-center justify-center h-32">
            <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
              {product.category === 'Electronics' && '💻'}
              {product.category === 'Wearables' && '⌚'}
              {product.category === 'Furniture' && '🪑'}
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(product.category)}`}>
              {product.category}
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${product.price}
              </p>
              <p className={`text-sm font-medium ${stockStatus.color}`}>
                {stockStatus.text} ({product.stock})
              </p>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
