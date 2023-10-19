const { addProductJoi } = require('./shemas');

const validateNewProduct = (product) => {
  const { error } = addProductJoi.validate(product);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateNewProduct,
};