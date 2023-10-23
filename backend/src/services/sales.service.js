const { salesModel } = require('../models');
const { SUCCESSFUL, NOT_FOUND, CREATED } = require('../utils/statusHTTP');
const response = require('../utils/responseMessageService');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return response(SUCCESSFUL, sales);
};

const findById = async (productId) => {
  const sale = await salesModel.findById(productId);

  if (sale.length === 0) return response(NOT_FOUND, { message: 'Sale not found' });
  
  return { status: SUCCESSFUL, data: sale };
};

const insert = async (sale) => {
  const saleId = await salesModel.insert(sale);

  const newSale = { id: saleId, itemsSold: [...sale] };

  return response(CREATED, newSale);
};

const remove = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (sale.length === 0) return response(NOT_FOUND, { message: 'Sale not found' });

  await salesModel.remove(saleId);
};

module.exports = {
  findAll,
  findById,
  insert,
  remove,
};