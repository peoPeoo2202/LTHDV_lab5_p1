const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getAllSuppliers,
  showCreateForm,
  createSupplier,
  getSupplierById,
  showEditForm,
  updateSupplier,
  deleteSupplier,
  // API endpoints
  getAllSuppliersAPI,
  getSupplierByIdAPI,
  createSupplierAPI,
  updateSupplierAPI,
  deleteSupplierAPI
} = require('../controllers/supplierController');

// Validation middleware
const supplierValidation = [
  body('name')
    .notEmpty()
    .withMessage('Supplier name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Supplier name must be between 2 and 100 characters')
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
    .trim()
];

// Web routes
router.get('/', getAllSuppliers);
router.get('/new', showCreateForm);
router.post('/', supplierValidation, createSupplier);
router.get('/:id', getSupplierById);
router.get('/:id/edit', showEditForm);
router.post('/:id', supplierValidation, updateSupplier);
router.post('/:id/delete', deleteSupplier);

// API routes
router.get('/api/suppliers', getAllSuppliersAPI);
router.get('/api/suppliers/:id', getSupplierByIdAPI);
router.post('/api/suppliers', supplierValidation, createSupplierAPI);
router.put('/api/suppliers/:id', supplierValidation, updateSupplierAPI);
router.delete('/api/suppliers/:id', deleteSupplierAPI);

module.exports = router;
