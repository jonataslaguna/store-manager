const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { INVALID_VALUE, BAD_REQUEST } = require('../utils/statusHTTP');

const validateUpdateProduct = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(mapStatusHTTP(BAD_REQUEST)).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(mapStatusHTTP(INVALID_VALUE))
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

module.exports = {
  validateUpdateProduct,
};