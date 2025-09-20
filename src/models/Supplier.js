const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Supplier name is required'],
    trim: true,
    maxlength: [100, 'Supplier name cannot exceed 100 characters']
  },
  address: {
    type: String,
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        // Basic phone validation - at least 10 digits
        return !v || /^[\d\s\-\+\(\)]{10,}$/.test(v);
      },
      message: 'Phone number must be at least 10 characters long'
    }
  }
}, {
  timestamps: true
});

// Index for better query performance
supplierSchema.index({ name: 1 });

module.exports = mongoose.model('Supplier', supplierSchema);
