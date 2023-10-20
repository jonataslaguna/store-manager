const { productModel } = require('../models');
const { validateNewProduct } = require('./validations/validationsInputValues');
const { SUCCESSFUL, NOT_FOUND, CREATED } = require('../utils/statusHTTP');

const findAll = async () => {
  const product = await productModel.findAll();
  return { status: SUCCESSFUL, data: product };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) {
    return { status: NOT_FOUND, data: { message: 'Product not found' } };
  }
  return { status: SUCCESSFUL, data: product };
};

const insert = async (product) => {
  const error = validateNewProduct(product);

  if (error) return { status: error.status, data: { message: error.message } };

  const productId = await productModel.insert(product);

  const newProduct = { id: productId, ...product };

  return { status: CREATED, data: newProduct };
};

const update = async (product, productId) => {
  const findProduct = await productModel.findById(productId);
  
  if (!findProduct) {
    return { status: NOT_FOUND, data: { message: 'Product not found' } };
  }

  await productModel.update(product, productId);

  const findProdctUpdated = await productModel.findById(productId);
  
  const productUpdated = { id: productId, ...findProdctUpdated };

  return { status: SUCCESSFUL, data: productUpdated };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};