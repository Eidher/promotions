'use strict';

const mongoose = require('mongoose');
const InventoryModel = require('./Inventory');
const PromotionModel = require('./Promotion');

const Schema = new mongoose.Schema({
  sku: String,
  name: String,
  price: Number,
  inventory: InventoryModel.schema,
  promotion: PromotionModel.schema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', Schema);
