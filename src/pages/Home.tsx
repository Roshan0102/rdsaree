import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../types';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNewArrivals = async () => {
    try {
      const productsData = localStorage.getItem('products');
      if (productsData) {
        const products = JSON.parse(productsData);
        const newProducts = products
          .filter((product: Product) => product.isNew)
          .sort((a: Product, b: Product) => parseInt(b._id) - parseInt(a._id))
          .slice(0, 4);
        setNewArrivals(newProducts);
      }
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover Elegant Saree Collections
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Explore our handpicked selection of traditional and modern sarees
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-12">Our Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card w-full bg-base-100 shadow-xl image-full h-96">
            <figure>
              <img src="https://i.postimg.cc/rmtNkPVS/IMG-20250310-WA0008.jpg" alt="Silk Sarees" className="w-full h-full object-cover" />
            </figure>
            <div className="card-body flex justify-center items-center">
              <h3 className="card-title text-3xl font-serif text-white">Silk Sarees</h3>
              <div className="card-actions justify-center">
                <Link to="/products/silk" className="btn btn-primary btn-outline btn-lg rounded-full px-8 hover:scale-105 transition-transform duration-300">
                  View Collection
                </Link>
              </div>
            </div>
          </div>
          
          <div className="card w-full bg-base-100 shadow-xl image-full h-96">
            <figure>
              <img src="https://i.postimg.cc/RFN4Vwy1/IMG-20250407-WA0010.jpg" alt="Cotton Sarees" className="w-full h-full object-cover" />
            </figure>
            <div className="card-body flex justify-center items-center">
              <h3 className="card-title text-3xl font-serif text-white">Cotton Sarees</h3>
              <div className="card-actions justify-center">
                <Link to="/products/cotton" className="btn btn-primary btn-outline btn-lg rounded-full px-8 hover:scale-105 transition-transform duration-300">
                  View Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        ) : newArrivals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-105">
                  <div className="aspect-square">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No new arrivals at the moment.</p>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
            <p className="text-gray-600">Handpicked collection of premium quality sarees</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and secure shipping across India</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
            <p className="text-gray-600">Simple ordering process via WhatsApp</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 