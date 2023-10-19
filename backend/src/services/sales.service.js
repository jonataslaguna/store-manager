const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (productId) => {
  const sale = await salesModel.findById(productId);
  if (sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

const insert = async (sale) => {
  const saleId = await salesModel.insert(sale);

  const newSale = { id: saleId, itemsSold: [...sale] };

  return { status: 'CREATED', data: newSale };
};

module.exports = {
  findAll,
  findById,
  insert,
};