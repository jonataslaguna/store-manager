const { productModel } = require('../models');
const { validateNewProduct } = require('./validations/validationsInputValues');
const { SUCCESSFUL, NOT_FOUND, CREATED } = require('../utils/statusHTTP');

const response = (resposeStatus, responseData) => ({ status: resposeStatus, data: responseData });

const findAll = async () => {
  const product = await productModel.findAll();
  return response(SUCCESSFUL, product);
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) {
    return response(NOT_FOUND, { message: 'Product not found' });
  }
  return response(SUCCESSFUL, product);
};

const insert = async (product) => {
  const error = validateNewProduct(product);

  if (error) return response(error.status, { message: error.message });
  
  const productId = await productModel.insert(product);

  const newProduct = { id: productId, ...product };

  return response(CREATED, newProduct);
};

const update = async (product, productId) => {
  const findProduct = await productModel.findById(productId);
  
  if (!findProduct) {
    return response(NOT_FOUND, { message: 'Product not found' });
  }

  await productModel.update(product, productId);

  const findProdctUpdated = await productModel.findById(productId);
  
  const productUpdated = { id: productId, ...findProdctUpdated };

  return response(SUCCESSFUL, productUpdated);
};

const remove = async (productId) => {
  const findProduct = await productModel.findById(productId);

  if (!findProduct) {
    return response(NOT_FOUND, { message: 'Product not found' });
  }

  await productModel.remove(productId);
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};