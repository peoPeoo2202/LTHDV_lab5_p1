// 404 handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// Global error handler
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, status: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, status: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, status: 400 };
  }

  // Check if it's an API request
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }

  // For web requests, redirect with flash message
  req.flash('error', error.message || 'Something went wrong');
  
  // Redirect to appropriate page based on the route
  if (req.originalUrl.includes('/suppliers')) {
    return res.redirect('/suppliers');
  } else if (req.originalUrl.includes('/products')) {
    return res.redirect('/products');
  } else {
    return res.redirect('/');
  }
};

module.exports = {
  notFound,
  errorHandler
};
