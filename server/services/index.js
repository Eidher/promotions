const products = require('./products');
const inventories = require('./inventories');
const promotions = require('./promotions');
const promotionTypes = require('./promotionTypes');

module.exports = {
    ProductsService: products,
    InventoriesService: inventories,
    PromotionsService: promotions,
    PromotionTypesService: promotionTypes,
}