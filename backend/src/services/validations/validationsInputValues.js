const { addProductJoi } = require('./shemas');
const { BAD_REQUEST, INVALID_VALUE } = require('../../utils/statusHTTP');

const validateNewProduct = (product) => {
  const { error } = addProductJoi.validate(product);

  if (error) return { status: INVALID_VALUE, message: error.message };

  if (!product.name) {
    return { status: BAD_REQUEST, message: '"name" is required' };
  }
};

module.exports = {
  validateNewProduct,
};