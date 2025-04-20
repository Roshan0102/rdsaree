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
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden rounded-2xl">
        <div className="absolute inset-0">
          <img 
            src="https://i.postimg.cc/sgKWLsJq/IMG-20250411-WA0000.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <span className="inline-block text-white/90 text-lg md:text-xl mb-4 font-medium">
                Welcome to RD Collections
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
                Discover Elegant<br />Saree Collections
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                Explore our handpicked selection of traditional and modern sarees, crafted with finest materials and exquisite designs
              </p>
              <Link
                to="/products"
                className="inline-flex items-center bg-white text-primary px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 text-center mb-12">
            Explore Our Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Silk Sarees Card */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg h-[500px]">
              <img 
                src="https://i.postimg.cc/rmtNkPVS/IMG-20250310-WA0008.jpg" 
                alt="Silk Sarees" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl md:text-4xl font-serif mb-4">Silk Sarees</h3>
                  <p className="text-gray-200 mb-6 text-lg">Discover our exquisite collection of premium silk sarees</p>
                  <Link 
                    to="/products/silk" 
                    className="inline-flex items-center bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Cotton Sarees Card */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg h-[500px]">
              <img 
                src="https://i.postimg.cc/RFN4Vwy1/IMG-20250407-WA0010.jpg" 
                alt="Cotton Sarees" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl md:text-4xl font-serif mb-4">Cotton Sarees</h3>
                  <p className="text-gray-200 mb-6 text-lg">Explore our comfortable and elegant cotton sarees</p>
                  <Link 
                    to="/products/cotton" 
                    className="inline-flex items-center bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">New Arrivals</h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="loading loading-spinner loading-lg text-primary"></div>
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
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-700">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700">No new arrivals at the moment.</p>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
            <p className="text-gray-700">Handpicked collection of premium quality sarees</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-700">Quick and secure shipping across India</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Shopping</h3>
            <p className="text-gray-700">Simple ordering process via WhatsApp</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 