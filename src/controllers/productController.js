const { validationResult } = require('express-validator');
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// GET /products - List all products with supplier info
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('supplierId', 'name address phone')
      .sort({ createdAt: -1 });
    
    res.render('products/list', { 
      products,
      title: 'Products List',
      success: req.flash('success'),
      error: req.flash('error')
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    req.flash('error', 'Error fetching products');
    res.render('products/list', { 
      products: [],
      title: 'Products List',
      success: req.flash('success'),
      error: req.flash('error')
    });
  }
};

// GET /products/new - Show create form
const showCreateForm = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.render('products/form', { 
      product: {},
      suppliers,
      title: 'Create New Product',
      action: '/products',
      method: 'POST',
      errors: req.flash('errors') || []
    });
  } catch (error) {
    console.error('Error fetching suppliers for form:', error);
    req.flash('error', 'Error loading form');
    res.redirect('/products');
  }
};

// POST /products - Create new product
const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('errors', errors.array());
      return res.redirect('/products/new');
    }

    const { name, address, phone, supplierId } = req.body;
    const product = new Product({ name, address, phone, supplierId });
    await product.save();
    
    req.flash('success', 'Product created successfully');
    res.redirect('/products');
  } catch (error) {
    console.error('Error creating product:', error);
    req.flash('error', 'Error creating product');
    res.redirect('/products/new');
  }
};

// GET /products/:id - Show product details
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('supplierId', 'name address phone');
    
    if (!product) {
      req.flash('error', 'Product not found');
      return res.redirect('/products');
    }
    
    res.render('products/detail', { 
      product,
      title: `Product: ${product.name}`
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    req.flash('error', 'Error fetching product');
    res.redirect('/products');
  }
};

// GET /products/:id/edit - Show edit form
const showEditForm = async (req, res) => {
  try {
    const [product, suppliers] = await Promise.all([
      Product.findById(req.params.id),
      Supplier.find().sort({ name: 1 })
    ]);
    
    if (!product) {
      req.flash('error', 'Product not found');
      return res.redirect('/products');
    }
    
    res.render('products/form', { 
      product,
      suppliers,
      title: `Edit Product: ${product.name}`,
      action: `/products/${product._id}`,
      method: 'POST',
      errors: req.flash('errors') || []
    });
  } catch (error) {
    console.error('Error fetching product for edit:', error);
    req.flash('error', 'Error fetching product');
    res.redirect('/products');
  }
};

// PUT /products/:id - Update product
const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('errors', errors.array());
      return res.redirect(`/products/${req.params.id}/edit`);
    }

    const { name, address, phone, supplierId } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, address, phone, supplierId },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      req.flash('error', 'Product not found');
      return res.redirect('/products');
    }
    
    req.flash('success', 'Product updated successfully');
    res.redirect('/products');
  } catch (error) {
    console.error('Error updating product:', error);
    req.flash('error', 'Error updating product');
    res.redirect(`/products/${req.params.id}/edit`);
  }
};

// DELETE /products/:id - Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      req.flash('error', 'Product not found');
      return res.redirect('/products');
    }
    
    req.flash('success', 'Product deleted successfully');
    res.redirect('/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    req.flash('error', 'Error deleting product');
    res.redirect('/products');
  }
};

// API endpoints for JSON responses
const getAllProductsAPI = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('supplierId', 'name address phone')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
};

const getProductByIdAPI = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('supplierId', 'name address phone');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
};

const createProductAPI = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, address, phone, supplierId } = req.body;
    const product = new Product({ name, address, phone, supplierId });
    await product.save();
    
    // Populate supplier info for response
    await product.populate('supplierId', 'name address phone');
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
};

const updateProductAPI = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, address, phone, supplierId } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, address, phone, supplierId },
      { new: true, runValidators: true }
    ).populate('supplierId', 'name address phone');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
};

const deleteProductAPI = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
};

module.exports = {
  getAllProducts,
  showCreateForm,
  createProduct,
  getProductById,
  showEditForm,
  updateProduct,
  deleteProduct,
  // API endpoints
  getAllProductsAPI,
  getProductByIdAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI
};
