const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/data', adminController.getAdminData);
router.post('/products', adminController.createProduct);

module.exports = router;
