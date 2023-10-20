const { productModel } = require('../models');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateProductExists = async (req, res, next) => {
  const sale = req.body;
  let productNotFound = false;

  await Promise.all(
    sale.map(async (saleItem) => {
      const product = await productModel.findById(saleItem.productId);
      if (!product) {
        productNotFound = true;
      }
    }),
  );

  if (productNotFound) {
    return res.status(mapStatusHTTP('NOT_FOUND')).json({ message: 'Product not found' });
  }

  next();
};

module.exports = {
  validateProductExists,
};