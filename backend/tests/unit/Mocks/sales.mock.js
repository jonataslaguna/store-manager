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

const insertSales = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const insertSalesSuccessful = {
  status: 'CREATED',
  data: {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
};

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
  insertSales,
  insertSalesSuccessful,
};