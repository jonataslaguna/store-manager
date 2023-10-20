const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await productService.findAll();
    
  res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const product = req.body;

  const { status, data } = await productService.insert(product);

  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  const { status, data } = await productService.update(product, id);

  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  insert,
  updateProduct,
};