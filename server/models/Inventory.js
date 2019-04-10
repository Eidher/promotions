'use strict';

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  _productId: mongoose.Schema.Types.ObjectId,
  qty: Number,
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inventory', Schema);
