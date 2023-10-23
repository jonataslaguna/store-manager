const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const {
  productsFromModel,
  productsFromDB,
  productId,
  productIdFromModel,
  insertIdFromModelAndFromDB,
} = require('../Mocks/product.mock');

describe('PRODUCT MODEL:', function () {
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
  it('Does not recover product with non-existent id', async function () {
    const nonExistentId = 5; 
    sinon.stub(connection, 'execute').resolves([[]]); 
  
    const product = await productModel.findById(nonExistentId);
  
    expect(product).to.be.an('undefined'); 
  });

  it('Test function insert', async function () {
    sinon.stub(connection, 'execute').resolves([insertIdFromModelAndFromDB]);

    const products = await productModel.insert(insertIdFromModelAndFromDB.insertId);

    expect(products).to.be.an('number');
    expect(products).to.be.deep.equal(insertIdFromModelAndFromDB.insertId);
  });

  it('Test function update', async function () {
    sinon.stub(connection, 'execute').resolves(null);

    const productIdInputValue = 1;
    const product = { name: 'Novo Produto', price: 10 };
    const expectedQuery = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    const expectedValues = ['Novo Produto', 10, productIdInputValue];
  
    await productModel.update(product, productIdInputValue);
  
    expect(connection.execute.firstCall.args[0]).to.equal(expectedQuery);
    expect(connection.execute.firstCall.args[1]).to.deep.equal(expectedValues);
  });

  it('Must call the execute function with the correct parameters', async function () {
    sinon.stub(connection, 'execute').resolves(null);
    const productIdInput = 1;
    const expectedQuery = 'DELETE FROM products WHERE id = ?';
    const expectedValues = [productIdInput];

    await productModel.remove(productIdInput);

    expect(connection.execute.firstCall.args[0]).to.equal(expectedQuery);
    expect(connection.execute.firstCall.args[1]).to.deep.equal(expectedValues);
  });
});