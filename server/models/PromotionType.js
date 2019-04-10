'use strict';

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: String,
    updatedAt: { type: Date, default: Date.now },
}, { collection: 'promotionTypes' });

module.exports = mongoose.model('PromotionType', Schema);
