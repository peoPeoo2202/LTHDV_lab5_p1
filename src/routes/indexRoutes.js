const express = require('express');
const router = express.Router();

// GET / - Home page
router.get('/', (req, res) => {
  res.render('home', {
    title: 'Supplier & Product Management System',
    success: req.flash('success'),
    error: req.flash('error')
  });
});

module.exports = router;
