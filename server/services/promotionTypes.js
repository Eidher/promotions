"use strict";

const debug = require("debug")("bcgdv:services");
const { PromotionTypeModel } = require("../models");

const getPromotionTypeById = async _id => {
  try {
    const promotionType = await PromotionTypeModel.findById(_id).exec();
    return promotionType || {};
  } catch (err) {
    debug("Error: ", err);
    return {};
  }
};

module.exports = {
  getPromotionTypeById
};
