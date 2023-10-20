const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validatePropertyProductId = (sale) => sale.every((property) => property.productId > 0);

const validatePropertyQuantity = (sale) => sale.every((property) => property.quantity > 0);

const hasProperty = (array, property) => array
  .every((arrayProperty) => arrayProperty[property] !== undefined);

const validateNewSale = (req, res, next) => {
  const sale = req.body;

  const veryPropertyProductId = hasProperty(sale, 'productId');

  const veryPropertyQuantity = hasProperty(sale, 'quantity');

  const propertyQuantity = validatePropertyQuantity(sale);

  const propertyProductId = validatePropertyProductId(sale);

  if (!veryPropertyProductId || !propertyProductId) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: '"productId" is required' });
  }

  if (!veryPropertyQuantity) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: '"quantity" is required' });
  }

  if (!propertyQuantity) {
    return res.status(mapStatusHTTP('INVALID_VALUE'))
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateNewSale,
};