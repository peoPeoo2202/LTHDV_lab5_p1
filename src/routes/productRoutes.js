const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
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
} = require('../controllers/productController');

// Validation middleware
const productValidation = [
  body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters')
    .trim(),
  body('address')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Address cannot exceed 200 characters')
    .trim(),
  body('phone')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Phone number must be at least 10 characters long')
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Phone number contains invalid characters')
    .trim(),
  body('supplierId')
    .notEmpty()
    .withMessage('Supplier is required')
    .isMongoId()
    .withMessage('Invalid supplier ID')
];

// Web routes
router.get('/', getAllProducts);
router.get('/new', showCreateForm);
router.post('/', productValidation, createProduct);
router.get('/:id', getProductById);
router.get('/:id/edit', showEditForm);
router.post('/:id', productValidation, updateProduct);
router.post('/:id/delete', deleteProduct);

// API routes
router.get('/api/products', getAllProductsAPI);
router.get('/api/products/:id', getProductByIdAPI);
router.post('/api/products', productValidation, createProductAPI);
router.put('/api/products/:id', productValidation, updateProductAPI);
router.delete('/api/products/:id', deleteProductAPI);

module.exports = router;
