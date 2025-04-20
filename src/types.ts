export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  isNew?: boolean;
  createdAt: string;
  type?: string;
}

export interface User {
  username: string;
  role: 'admin';
} 