const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const {
  productsFromModel,
  productsFromDB,
  productId,
  productIdFromModel,
} = require('../Mocks/product.mock');

describe('PRODUCT MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Test function findAll', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Test function finById', async function () {
    sinon.stub(connection, 'execute').resolves([[productId]]);

    const inputValue = 2;
    const products = await productModel.findById(inputValue);

    expect(products).to.be.an('object');
    expect(products).to.be.deep.equal(productIdFromModel);
  });
  it('Does not recover driver with non-existent id', async function () {
    const nonExistentId = 5; 
    sinon.stub(connection, 'execute').resolves([[]]); 
  
    const product = await productModel.findById(nonExistentId);
  
    expect(product).to.be.an('undefined'); 
  });
});