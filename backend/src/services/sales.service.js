const { salesModel } = require('../models');
const { SUCCESSFUL, NOT_FOUND, CREATED } = require('../utils/statusHTTP');

const saleNotFoundMessage = () => ({ status: NOT_FOUND, data: { message: 'Sale not found' } });

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { status: SUCCESSFUL, data: sales };
};

const findById = async (productId) => {
  const sale = await salesModel.findById(productId);

  if (sale.length === 0) return saleNotFoundMessage();
  
  return { status: SUCCESSFUL, data: sale };
};

const insert = async (sale) => {
  const saleId = await salesModel.insert(sale);

  const newSale = { id: saleId, itemsSold: [...sale] };

  return { status: CREATED, data: newSale };
};

const remove = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (sale.length === 0) return saleNotFoundMessage();

  await salesModel.remove(saleId);
};

module.exports = {
  findAll,
  findById,
  insert,
  remove,
};