import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TrashIcon, PencilIcon, XIcon, SearchIcon } from '@heroicons/react/outline';

interface Product {
  _id: string;
  name: string;
  category: string;
  type: string;
  price: number;
  images: string[];
  description: string;
  isNew: boolean;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: 'silk',
    price: '',
    description: '',
    images: [] as string[],
    isNew: false
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchProducts();
  }, [navigate]);

  useEffect(() => {
    // Filter and sort products whenever products or search query changes
    const filtered = products
      .filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => parseInt(b._id) - parseInt(a._id)); // Sort by _id (timestamp) in descending order
    
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const fetchProducts = () => {
    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        // Sort products by _id (timestamp) in descending order
        const sortedProducts = parsedProducts.sort((a: Product, b: Product) => 
          parseInt(b._id) - parseInt(a._id)
        );
        setProducts(sortedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const imageUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);

      try {
        console.log('Uploading image to Cloudinary...');
        console.log('Using upload preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        console.log('Using cloud name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
        
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        console.log('Cloudinary response:', cloudinaryResponse.data);
        
        if (cloudinaryResponse.data && cloudinaryResponse.data.secure_url) {
          imageUrls.push(cloudinaryResponse.data.secure_url);
          console.log('Image uploaded successfully:', cloudinaryResponse.data.secure_url);
        } else {
          console.error('Invalid response from Cloudinary:', cloudinaryResponse.data);
          toast.error('Failed to upload image: Invalid response from Cloudinary');
          return;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        if (axios.isAxiosError(error)) {
          console.error('Error details:', error.response?.data);
          if (error.response?.data?.error?.message === 'Upload preset not found') {
            toast.error('Upload preset not found. Please create the upload preset in your Cloudinary account.');
          } else {
            toast.error(`Failed to upload image: ${error.response?.data?.error?.message || error.message}`);
          }
        } else {
          toast.error('Failed to upload image: Unknown error');
        }
        return;
      }
    }

    if (imageUrls.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
      toast.success(`${imageUrls.length} image(s) uploaded successfully`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Filter out any null or undefined values from images array
      const cleanFormData = {
        ...formData,
        images: formData.images.filter(Boolean),
        price: Number(formData.price) // Convert price to number
      };

      // Validate that we have at least one image
      if (cleanFormData.images.length === 0) {
        toast.error('Please upload at least one image');
        return;
      }
      
      const storedProducts = localStorage.getItem('products');
      const products = storedProducts ? JSON.parse(storedProducts) : [];
      
      if (editingProduct) {
        // Update existing product
        const updatedProducts = products.map((p: Product) => 
          p._id === editingProduct._id ? { ...cleanFormData, _id: p._id } : p
        );
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        toast.success('Product updated successfully');
        setEditingProduct(null);
      } else {
        // Create new product
        const newProduct = {
          ...cleanFormData,
          _id: Date.now().toString(), // Generate a simple ID
          type: cleanFormData.category === 'silk' ? 'Dola Silk' : 'Kalyani Cotton'
        };
        localStorage.setItem('products', JSON.stringify([...products, newProduct]));
        toast.success('Product added successfully');
      }
      
      setShowAddForm(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(editingProduct ? 'Failed to update product' : 'Failed to add product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'silk',
      price: '',
      description: '',
      images: [],
      isNew: false
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      images: [...product.images],
      isNew: product.isNew
    });
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    resetForm();
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        const products = JSON.parse(storedProducts);
        const updatedProducts = products.filter((p: Product) => p._id !== id);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        toast.success('Product deleted successfully');
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="py-8 container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Admin Dashboard</h1>
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            Add New Product
          </button>
        ) : (
          <button
            onClick={handleCancelEdit}
            className="btn btn-ghost"
          >
            Cancel
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="card bg-base-100 shadow-xl mb-10">
          <div className="card-body">
            <h2 className="card-title font-serif">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="silk">Silk Saree</option>
                    <option value="cotton">Cotton Saree</option>
                  </select>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Price (₹)</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">New Arrival</span>
                  </label>
                  <div className="flex items-center h-12">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={formData.isNew}
                      onChange={handleChange}
                      className="checkbox checkbox-primary"
                    />
                    <span className="ml-3">Mark as New Arrival</span>
                  </div>
                </div>
                <div className="form-control w-full md:col-span-2">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={4}
                    required
                  />
                </div>
                <div className="form-control w-full md:col-span-2">
                  <label className="label">
                    <span className="label-text">Images</span>
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input file-input-bordered w-full"
                    required={formData.images.length === 0}
                  />
                  
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="h-32 w-full object-cover rounded-lg shadow-sm"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-90 transition-opacity"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                images: prev.images.filter((_, i) => i !== index)
                              }));
                            }}
                          >
                            <XIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="card-actions justify-end mt-6">
                <button 
                  type="button" 
                  className="btn btn-ghost" 
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="divider">Products</div>

      {/* Search Bar */}
      <div className="form-control mb-6">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search products..."
            className="input input-bordered w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-square btn-primary">
            <SearchIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          {searchQuery ? (
            <p className="text-lg text-neutral-content">No products found matching your search.</p>
          ) : (
            <p className="text-lg text-neutral-content">No products available. Add your first product!</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <figure className="relative h-64">
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
              <div className="card-body">
                <h3 className="card-title font-serif">{product.name}</h3>
                {product.type && <p className="text-neutral-content text-sm">{product.type}</p>}
                <p className="text-primary font-semibold text-lg mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                <p className="text-sm text-neutral-content line-clamp-2 mt-1">{product.description}</p>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-circle btn-ghost text-error"
                    title="Delete product"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleEdit(product)}
                    className="btn btn-circle btn-ghost text-primary"
                    title="Edit product"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 