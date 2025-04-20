import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import { Product } from '../types';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
          const products = JSON.parse(storedProducts);
          const foundProduct = products.find((p: Product) => p._id === id);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            toast.error('Product not found');
            navigate('/products');
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product!.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product!.images.length - 1 ? 0 : prev + 1));
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    
    const message = encodeURIComponent(
      `Hi, I'm interested in purchasing:\n\n` +
      `Product: ${product.name}\n` +
      `Type: ${product.type}\n` +
      `Price: ₹${product.price.toLocaleString('en-IN')}\n\n` +
      `Please provide more details about this product.`
    );
    
    window.open(`https://wa.me/918838286823?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="container mx-auto flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto text-center py-10">
        <h2 className="text-2xl font-serif">Product not found</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary mt-4">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-square rounded-lg overflow-hidden bg-base-200">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost bg-base-100/80"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost bg-base-100/80"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
            {product.type && (
              <p className="text-neutral-content">{product.type}</p>
            )}
            {product.isNew && (
              <div className="badge badge-primary mt-2">NEW</div>
            )}
          </div>

          <p className="text-2xl font-semibold text-primary">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold">Description</h3>
            <p>{product.description}</p>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="btn btn-primary btn-lg w-full gap-2"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            Order via WhatsApp
          </button>

          <div className="text-sm text-neutral-content text-center mt-4">
            Click the button above to discuss product details and place your order via WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 