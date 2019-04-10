"use strict";

var mongoose = require("mongoose");
const debug = require("debug")("bcgdv:services");
const { ProductModel } = require("../models");
const InventoriesService = require("./inventories");
const PromotionsService = require("./promotions");

/**
 *  Get all products if ids are not passed
 *
 * @param {*} ids
 * @param {boolean} [attachPromotion=true]
 * @param {boolean} [attachInventory=true]
 * @returns
 */
const getAllProducts = async (
  ids,
  attachPromotion = true,
  attachInventory = true
) => {
  try {
    let query = {};

    if (ids) {
      const objectsIds = ids.map(id => mongoose.Types.ObjectId(id));
      query = {
        _id: { $in: objectsIds }
      };
    }

    const products = await ProductModel.find(query).exec();
    if (attachPromotion || attachInventory) {
      for (const product of products) {
        if (attachPromotion) {
          product.inventory = await InventoriesService.getInventoryByProductId(
            product._id
          );
        }

        if (attachInventory) {
          product.promotion = await PromotionsService.getPromotionByProductId(
            product._id
          );
        }
      }
    }

    return products;
  } catch (err) {
    debug("Error: ", err);
    throw err;
  }
};

/**
 * Get products by ids array
 *
 * @param {Array} ids
 * @returns
 */
const getProducts = async ids => {
  if (!ids) {
    return new Error("Ids array is required.");
  }

  try {
    return await getAllProducts(ids);
  } catch (err) {
    debug("Error: ", err);
    throw err;
  }
};

module.exports = {
  getAllProducts,
  getProducts
};
