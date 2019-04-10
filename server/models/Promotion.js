'use strict';

const mongoose = require('mongoose');
const PromotionTypeModel = require('./PromotionType');

const Schema = new mongoose.Schema({
    amount : Number,
    comparison : String,
    value : mongoose.Schema.Types.Mixed,
    _promotionTypeId: mongoose.Schema.Types.ObjectId,
    promotionType : PromotionTypeModel.schema,
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Promotion', Schema);
