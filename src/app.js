const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const connectDB = require('./config/db');
require('dotenv').config();

// Import routes
const indexRoutes = require('./routes/indexRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');

// Import error handlers
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// EJS layout configuration
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Flash messages middleware
app.use(flash());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

// API routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
