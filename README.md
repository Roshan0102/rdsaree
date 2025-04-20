# RD Saree Collections - E-Commerce Website

A beautiful, responsive e-commerce website for RD Saree Collections, showcasing traditional sarees with modern design and functionality.

## Features

- 🛍️ Product browsing by categories (Silk and Cotton)
- 📱 Responsive design for all devices
- 👤 Customer authentication
- ⭐ Favorite products functionality
- 👨‍💼 Admin dashboard for product management
- 📱 WhatsApp ordering system
- 🔍 Advanced search and filtering

## Tech Stack

- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Authentication: JWT
- Image Hosting: PostImage

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   WHATSAPP_NUMBER=your-whatsapp-number
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

## Admin Access

- Username: rd
- Password: larisa

## Image Hosting

The website uses PostImage for image hosting. To add new product images:

1. Upload images to [PostImage](https://postimages.org/)
2. Copy the direct link URL
3. Use the URL in the admin dashboard when adding new products

## WhatsApp Integration

To set up WhatsApp ordering:

1. Update the `WHATSAPP_NUMBER` in the `.env` file
2. The number should be in international format (e.g., 919876543210)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any queries or support, please contact the project maintainers. 