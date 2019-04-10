'use strict';

const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers');

// Get all products
router.get('/', productsController.getAll);

// Get products by id list
router.post('/', productsController.getByIds)

module.exports = router;
