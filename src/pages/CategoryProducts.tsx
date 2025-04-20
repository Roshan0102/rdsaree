import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category || !['silk', 'cotton'].includes(category.toLowerCase())) {
      navigate('/products');
      return;
    }
    fetchProducts();
  }, [category, navigate]);

  const fetchProducts = () => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        const allProducts = JSON.parse(storedProducts);
        const filteredProducts = allProducts.filter((product: Product) => 
          product.category.toLowerCase() === category?.toLowerCase()
        );
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = () => {
    return category === 'silk' ? 'Silk Sarees Collection' : 'Cotton Sarees Collection';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif mb-4">{getCategoryTitle()}</h1>
        <p className="text-neutral-content">
          {products.length} {products.length === 1 ? 'product' : 'products'} available
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-neutral-content">No products available in this category.</p>
          <Link to="/products" className="btn btn-primary mt-4">View All Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              to={`/product/${product._id}`} 
              key={product._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <figure className="relative h-72">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <div className="badge badge-primary absolute top-3 right-3">
                    NEW
                  </div>
                )}
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title font-serif">{product.name}</h3>
                {product.type && <p className="text-neutral-content text-sm">{product.type}</p>}
                <p className="text-primary font-semibold text-lg mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                <p className="text-sm text-neutral-content line-clamp-2 mt-1">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts; 