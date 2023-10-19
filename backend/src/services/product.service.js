const { productModel } = require('../models');
const { validateNewProduct } = require('./validations/validationsInputValues');

const findAll = async () => {
  const product = await productModel.findAll();
  return { status: 'SUCCESSFUL', data: product };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: product };
};

const insert = async (product) => {
  const error = validateNewProduct(product);

  if (error) return { status: error.status, data: { message: error.message } };

  const productId = await productModel.insert(product);

  const newProduct = { id: productId, ...product };

  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
};