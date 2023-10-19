const salesFromDBAndSalesFromModel = [
  {
    saleId: 1,
    date: '2023-10-19T17:11:46.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-10-19T17:11:46.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-10-19T17:11:46.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleId = [
  {
    date: '2023-10-19T17:11:46.000Z',
    productId: 3,
    quantity: 15,
  },
];

const salesFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: salesFromDBAndSalesFromModel,
};

const saleFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: saleId,
};

const saleFromServiceNotFound = { 
  status: 'NOT_FOUND', 
  data: { message: 'Sale not found' }, 
};

module.exports = {
  salesFromDBAndSalesFromModel,
  saleId,
  salesFromServiceSuccessful,
  saleFromServiceSuccessful,
  saleFromServiceNotFound,
};