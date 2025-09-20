# Supplier & Product Management System

A comprehensive CRUD web application for managing suppliers and products built with Node.js, Express, MongoDB, and Mongoose following MVC architecture.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, Delete for both Suppliers and Products
- **Relationship Management**: Products are linked to Suppliers with populate functionality
- **Dual Interface**: Web interface (EJS) and REST API (JSON) endpoints
- **Input Validation**: Server-side validation with express-validator
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Bootstrap-powered responsive UI
- **Data Seeding**: Sample data generation for testing

## 🛠️ Tech Stack

- **Backend**: Node.js (>=18), Express.js 4+
- **Database**: MongoDB with Mongoose 7+
- **View Engine**: EJS
- **Styling**: Bootstrap 5
- **Validation**: express-validator
- **Development**: nodemon, ESLint, Prettier

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd supplier-product-crud

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment file
cp env.example .env

# Edit .env file with your MongoDB connection string
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/supplier-product-crud

# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/supplier-product-crud

# Optional: Set port and session secret
PORT=3000
NODE_ENV=development
SESSION_SECRET=your-secret-key
```

### 3. Seed Database (Optional)

```bash
# Populate database with sample data
npm run seed
```

### 4. Start Development Server

```bash
# Start with nodemon (recommended for development)
npm run dev

# Or start normally
npm start
```

### 5. Access Application

- **Web Interface**: http://localhost:3000
- **API Base URL**: http://localhost:3000/api

## 📁 Project Structure

```
project-root/
├── package.json
├── env.example
├── .gitignore
├── README.md
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── models/
│   │   ├── Supplier.js        # Supplier Mongoose model
│   │   └── Product.js         # Product Mongoose model
│   ├── controllers/
│   │   ├── supplierController.js
│   │   └── productController.js
│   ├── routes/
│   │   ├── indexRoutes.js
│   │   ├── supplierRoutes.js
│   │   └── productRoutes.js
│   ├── views/
│   │   ├── layout.ejs         # Main layout template
│   │   ├── home.ejs           # Home page
│   │   ├── suppliers/
│   │   │   ├── list.ejs
│   │   │   ├── detail.ejs
│   │   │   └── form.ejs
│   │   └── products/
│   │       ├── list.ejs
│   │       ├── detail.ejs
│   │       └── form.ejs
│   └── middlewares/
│       └── errorHandler.js    # Error handling middleware
├── scripts/
│   └── seed.js                # Database seeding script
└── postman/
    └── lab-part1-crud.postman_collection.json
```

## 🌐 API Endpoints

### Suppliers API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/suppliers` | Get all suppliers |
| GET | `/api/suppliers/:id` | Get supplier by ID |
| POST | `/api/suppliers` | Create new supplier |
| PUT | `/api/suppliers/:id` | Update supplier |
| DELETE | `/api/suppliers/:id` | Delete supplier |

### Products API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with supplier info) |
| GET | `/api/products/:id` | Get product by ID (with supplier info) |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Web Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page |
| GET | `/suppliers` | Suppliers list page |
| GET | `/suppliers/new` | Create supplier form |
| GET | `/suppliers/:id` | Supplier detail page |
| GET | `/suppliers/:id/edit` | Edit supplier form |
| GET | `/products` | Products list page |
| GET | `/products/new` | Create product form |
| GET | `/products/:id` | Product detail page |
| GET | `/products/:id/edit` | Edit product form |

## 📊 Data Models

### Supplier Schema

```javascript
{
  name: String (required, max 100 chars),
  address: String (optional, max 200 chars),
  phone: String (optional, min 10 chars),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema

```javascript
{
  name: String (required, max 100 chars),
  address: String (optional, max 200 chars),
  phone: String (optional, min 10 chars),
  supplierId: ObjectId (required, ref: 'Supplier'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing with Postman

1. Import the provided Postman collection: `postman/lab-part1-crud.postman_collection.json`
2. Set the `base_url` variable to `http://localhost:3000`
3. Run the requests to test all CRUD operations

## 🔧 Development Scripts

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Install dependencies
npm install
```

## 🛡️ Validation Rules

### Supplier Validation
- **name**: Required, 2-100 characters
- **address**: Optional, max 200 characters
- **phone**: Optional, min 10 characters, valid phone format

### Product Validation
- **name**: Required, 2-100 characters
- **address**: Optional, max 200 characters
- **phone**: Optional, min 10 characters, valid phone format
- **supplierId**: Required, valid MongoDB ObjectId

## 🚨 Error Handling

- **404 Errors**: Custom 404 handler for missing routes
- **Validation Errors**: Detailed validation error messages
- **Database Errors**: Mongoose error handling
- **API Errors**: JSON error responses for API endpoints
- **Web Errors**: Flash messages for web interface

## 🎨 UI Features

- **Responsive Design**: Mobile-friendly Bootstrap layout
- **Flash Messages**: Success/error notifications
- **Form Validation**: Client-side and server-side validation
- **Confirmation Dialogs**: Delete confirmation for safety
- **Navigation**: Easy navigation between pages
- **Data Tables**: Sortable and responsive data tables

## 📝 Sample Data

The seed script creates:
- 5 sample suppliers with realistic data
- 8 sample products linked to suppliers
- Proper relationships between products and suppliers

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Ensure database permissions

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill existing process using the port

3. **Module Not Found**
   - Run `npm install` to install dependencies
   - Check Node.js version (>=18)

4. **Validation Errors**
   - Check required fields are provided
   - Verify data format (phone numbers, etc.)

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

**Nguyen Quang Khai** - Full-stack Node.js Developer

---

**Happy Coding! 🚀**
