"use strict";

var mongoose = require("mongoose");
const debug = require("debug")("bcgdv:services");
const { PromotionModel, ProductModel } = require("../models");
const PromotionTypesService = require("./promotionTypes");

const getPromotionByProductId = async _productId => {
  try {
    const promotion = await PromotionModel.findOne({ _productId }).exec();
    if (promotion) {
      promotion.promotionType = await PromotionTypesService.getPromotionTypeById(
        promotion._promotionTypeId
      );

      if (promotion.promotionType.name === "product") {
        promotion.value = await ProductModel.find({
          _id: { $in: promotion.value }
        }).exec();
      }
    }
    return promotion || {};
  } catch (err) {
    debug("Error: ", err);
    return {};
  }
};

module.exports = {
  getPromotionByProductId
};
