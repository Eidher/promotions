"use strict";

const debug = require("debug")("bcgdv:product:controller");
const { ProductsService } = require("../services");

/**
 * Gets all the products
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    const products = await ProductsService.getAllProducts();
    res.json(products);
  } catch (err) {
    debug("Error: ", err);
    next(err);
  }
};

/**
 * Gets products by id list
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getByIds = async (req, res, next) => {
  try {
    if (!req.body.ids) {
      const err = new Error("Ids list is required.");
      err.status = 400;
      return next(err);
    }

    const products = await ProductsService.getProducts(req.body.ids);
    res.json(products);
  } catch (err) {
    debug("Error: ", err);
    next(err);
  }
};

module.exports = {
  getAll,
  getByIds
};
