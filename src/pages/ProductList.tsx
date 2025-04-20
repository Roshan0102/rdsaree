import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FilterIcon, XIcon } from '@heroicons/react/outline';

interface Product {
  _id: string;
  name: string;
  category: string;
  type: string;
  price: number;
  description: string;
  images: string[];
  isNew: boolean;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        setLoading(true);
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          let filteredProducts = JSON.parse(storedProducts);
          
          // Filter by category if selected
          if (selectedCategory) {
            filteredProducts = filteredProducts.filter((p: Product) => p.category === selectedCategory);
          }
          
          // Filter by type if selected
          if (selectedType) {
            filteredProducts = filteredProducts.filter((p: Product) => p.type === selectedType);
          }
          
          // Filter by price range
          filteredProducts = filteredProducts.filter((p: Product) => 
            p.price >= priceRange[0] && p.price <= priceRange[1]
          );
          
          // Sort products
          switch (sortBy) {
            case 'price-low':
              filteredProducts.sort((a: Product, b: Product) => a.price - b.price);
              break;
            case 'price-high':
              filteredProducts.sort((a: Product, b: Product) => b.price - a.price);
              break;
            case 'newest':
            default:
              filteredProducts.sort((a: Product, b: Product) => 
                new Date(b._id).getTime() - new Date(a._id).getTime()
              );
              break;
          }
          
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    
    // Count active filters
    let count = 0;
    if (selectedCategory) count++;
    if (selectedType) count++;
    if (priceRange[0] > 0) count++;
    if (priceRange[1] < 10000) count++;
    if (sortBy !== 'newest') count++;
    setActiveFilters(count);
    
  }, [selectedCategory, selectedType, priceRange, sortBy]);

  const types = {
    silk: ['Dola Silk', 'Binni Silk', 'Banarasi Silk'],
    cotton: ['Kalyani Cotton', 'Linen Cotton']
  };
  
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedType('');
    setPriceRange([0, 10000]);
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif text-center mb-12">Our Collection</h1>
      
      {/* Filters and Sort */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-primary"
            >
              <FilterIcon className="h-5 w-5 mr-1" />
              Filters {activeFilters > 0 && <span className="badge badge-accent ml-1">{activeFilters}</span>}
            </button>
            
            {activeFilters > 0 && (
              <button 
                onClick={clearFilters}
                className="btn btn-ghost btn-sm"
              >
                Clear Filters
              </button>
            )}
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered select-sm"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="card bg-base-100 shadow-xl mb-8">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title font-serif">Filter Options</h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="btn btn-circle btn-sm btn-ghost"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Category</span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="select select-bordered"
                  >
                    <option value="">All Categories</option>
                    <option value="silk">Silk Sarees</option>
                    <option value="cotton">Cotton Sarees</option>
                  </select>
                </div>

                {/* Type Filter */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Type</span>
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="select select-bordered"
                    disabled={!selectedCategory}
                  >
                    <option value="">All Types</option>
                    {selectedCategory && types[selectedCategory as keyof typeof types]?.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Price Range</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      min="0"
                      className="input input-bordered"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      min={priceRange[0]}
                      className="input input-bordered"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-neutral-content">
            Showing {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
          {selectedCategory && (
            <div className="badge badge-lg">
              {selectedCategory === 'silk' ? 'Silk Sarees' : 'Cotton Sarees'}
              <button 
                className="ml-2"
                onClick={() => setSelectedCategory('')}
              >
                <XIcon className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-3xl mb-4">😔</div>
          <h3 className="text-2xl font-serif mb-2">No Products Found</h3>
          <p className="text-neutral-content mb-6 text-center max-w-md">
            We couldn't find any products matching your filters. Please try with different criteria.
          </p>
          <button 
            onClick={clearFilters}
            className="btn btn-primary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
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
                
                <div className="card-actions mt-3">
                  <button className="btn btn-primary btn-block">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 