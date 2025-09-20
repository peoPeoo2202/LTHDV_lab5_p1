const { validationResult } = require('express-validator');
const Supplier = require('../models/Supplier');

// GET /suppliers - List all suppliers
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.render('suppliers/list', { 
      suppliers,
      title: 'Suppliers List',
      success: req.flash('success'),
      error: req.flash('error')
    });
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    req.flash('error', 'Error fetching suppliers');
    res.render('suppliers/list', { 
      suppliers: [],
      title: 'Suppliers List',
      success: req.flash('success'),
      error: req.flash('error')
    });
  }
};

// GET /suppliers/new - Show create form
const showCreateForm = (req, res) => {
  res.render('suppliers/form', { 
    supplier: {},
    title: 'Create New Supplier',
    action: '/suppliers',
    method: 'POST',
    errors: req.flash('errors') || []
  });
};

// POST /suppliers - Create new supplier
const createSupplier = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('errors', errors.array());
      return res.redirect('/suppliers/new');
    }

    const { name, address, phone } = req.body;
    const supplier = new Supplier({ name, address, phone });
    await supplier.save();
    
    req.flash('success', 'Supplier created successfully');
    res.redirect('/suppliers');
  } catch (error) {
    console.error('Error creating supplier:', error);
    req.flash('error', 'Error creating supplier');
    res.redirect('/suppliers/new');
  }
};

// GET /suppliers/:id - Show supplier details
const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      req.flash('error', 'Supplier not found');
      return res.redirect('/suppliers');
    }
    
    res.render('suppliers/detail', { 
      supplier,
      title: `Supplier: ${supplier.name}`
    });
  } catch (error) {
    console.error('Error fetching supplier:', error);
    req.flash('error', 'Error fetching supplier');
    res.redirect('/suppliers');
  }
};

// GET /suppliers/:id/edit - Show edit form
const showEditForm = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      req.flash('error', 'Supplier not found');
      return res.redirect('/suppliers');
    }
    
    res.render('suppliers/form', { 
      supplier,
      title: `Edit Supplier: ${supplier.name}`,
      action: `/suppliers/${supplier._id}`,
      method: 'POST',
      errors: req.flash('errors') || []
    });
  } catch (error) {
    console.error('Error fetching supplier for edit:', error);
    req.flash('error', 'Error fetching supplier');
    res.redirect('/suppliers');
  }
};

// PUT /suppliers/:id - Update supplier
const updateSupplier = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('errors', errors.array());
      return res.redirect(`/suppliers/${req.params.id}/edit`);
    }

    const { name, address, phone } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { name, address, phone },
      { new: true, runValidators: true }
    );
    
    if (!supplier) {
      req.flash('error', 'Supplier not found');
      return res.redirect('/suppliers');
    }
    
    req.flash('success', 'Supplier updated successfully');
    res.redirect('/suppliers');
  } catch (error) {
    console.error('Error updating supplier:', error);
    req.flash('error', 'Error updating supplier');
    res.redirect(`/suppliers/${req.params.id}/edit`);
  }
};

// DELETE /suppliers/:id - Delete supplier
const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      req.flash('error', 'Supplier not found');
      return res.redirect('/suppliers');
    }
    
    req.flash('success', 'Supplier deleted successfully');
    res.redirect('/suppliers');
  } catch (error) {
    console.error('Error deleting supplier:', error);
    req.flash('error', 'Error deleting supplier');
    res.redirect('/suppliers');
  }
};

// API endpoints for JSON responses
const getAllSuppliersAPI = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: suppliers
    });
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching suppliers'
    });
  }
};

const getSupplierByIdAPI = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }
    
    res.json({
      success: true,
      data: supplier
    });
  } catch (error) {
    console.error('Error fetching supplier:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching supplier'
    });
  }
};

const createSupplierAPI = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, address, phone } = req.body;
    const supplier = new Supplier({ name, address, phone });
    await supplier.save();
    
    res.status(201).json({
      success: true,
      data: supplier
    });
  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating supplier'
    });
  }
};

const updateSupplierAPI = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, address, phone } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { name, address, phone },
      { new: true, runValidators: true }
    );
    
    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }
    
    res.json({
      success: true,
      data: supplier
    });
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating supplier'
    });
  }
};

const deleteSupplierAPI = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Supplier deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting supplier'
    });
  }
};

module.exports = {
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
};
