const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const productId = {
  id: 2,
  name: 'Traje de encolhimento',
};

const productIdFromModel = {
  id: 2,
  name: 'Traje de encolhimento',
};

const productsFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productsFromModel,
};

const productFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productId,
};

const productFromServiceNotFound = { 
  status: 'NOT_FOUND', 
  data: { message: 'Product not found' }, 
};

const insertIdFromModelAndFromDB = {
  insertId: 4,
};
  
module.exports = {
  productsFromModel,
  productsFromDB,
  productId,
  productIdFromModel,
  productsFromServiceSuccessful,
  productFromServiceSuccessful,
  productFromServiceNotFound,
  insertIdFromModelAndFromDB,
};