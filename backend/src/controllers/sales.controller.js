const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await salesService.findAll();
    
  res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const insertSale = async (req, res) => {
  const sale = req.body;
  const { status, data } = await salesService.insert(sale);
  return res.status(mapStatusHTTP(status)).json(data);
};

const removeSale = async (req, res) => {
  const { id } = req.params;
  const serviceResponse = await salesService.remove(id);

  if (serviceResponse) {
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data); 
  }

  return res.status(204).end();
};

module.exports = {
  findAll,
  findById,
  insertSale,
  removeSale,
};