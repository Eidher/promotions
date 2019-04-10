'use strict';

const Product = require('./Product');
const Inventory = require('./Inventory');
const Promotion = require('./Promotion');
const PromotionType = require('./PromotionType');

module.exports = {
    ProductModel: Product,
    InventoryModel: Inventory,
    PromotionModel: Promotion,
    PromotionTypeModel: PromotionType,
};
