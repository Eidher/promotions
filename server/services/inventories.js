"use strict";

const debug = require("debug")("bcgdv:services");
const { InventoryModel } = require("../models");

const getInventoryByProductId = async _productId => {
  try {
    const inventory = await InventoryModel.findOne({ _productId }).exec();
    return inventory || {};
  } catch (err) {
    debug("Error: ", err);
    return {};
  }
};

module.exports = {
  getInventoryByProductId
};
