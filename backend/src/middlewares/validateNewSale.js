const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { BAD_REQUEST, INVALID_VALUE } = require('../utils/statusHTTP');

const validatePropertyProductId = (sale) => sale.every((property) => property.productId > 0);

const validatePropertyQuantity = (sale) => sale.every((property) => property.quantity > 0);

const hasProperty = (array, property) => array
  .every((arrayProperty) => arrayProperty[property] !== undefined);

const validateNewSale = (req, res, next) => {
  const sale = req.body;

  const verifyPropertyProductId = hasProperty(sale, 'productId');

  const verifyPropertyQuantity = hasProperty(sale, 'quantity');

  const propertyQuantity = validatePropertyQuantity(sale);

  const propertyProductId = validatePropertyProductId(sale);

  if (!verifyPropertyProductId || !propertyProductId) {
    return res.status(mapStatusHTTP(BAD_REQUEST)).json({ message: '"productId" is required' });
  }

  if (!verifyPropertyQuantity) {
    return res.status(mapStatusHTTP(BAD_REQUEST)).json({ message: '"quantity" is required' });
  }

  if (!propertyQuantity) {
    return res.status(mapStatusHTTP(INVALID_VALUE))
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  validateNewSale,
};