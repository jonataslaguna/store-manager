const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { 
  productsFromModel,
  productsFromDB,
  productId,
  productCreated,
} = require('../Mocks/product.mock');

describe('PRODUCT SERVICE:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Test function findAll', async function () {
    sinon.stub(productModel, 'findAll').resolves(productsFromModel);

    const responseService = await productService.findAll();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(productsFromDB);
  });

  it('Test function finById', async function () {
    sinon.stub(productModel, 'findById').resolves(productId);

    const inputValue = 2;
    const responseService = await productService.findById(inputValue);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(productId);
  });

  it('Does not recover product with non-existent id', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const inputValue = 999;
    const responseService = await productService.findById(inputValue);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data.message).to.equal('Product not found');
  });

  it('Test function insert', async function () {
    sinon.stub(productModel, 'insert').resolves(4);

    const inputValue = { name: 'Playstation 5' };

    const responseService = await productService.insert(inputValue);
    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal(productCreated);
  });
  it('The product should not be added if it does not have the correct data', async function () {
    sinon.stub(productModel, 'insert').resolves(undefined);

    const inputValue = { name: 'P' };

    const responseService = await productService.insert(inputValue);
    expect(responseService.status).to.equal('INVALID_VALUE');
    expect(responseService.data.message).to.deep.equal('"name" length must be at least 5 characters long');
  });

  it('The product should not be added if the name property does not exist', async function () {
    sinon.stub(productModel, 'insert').resolves(undefined);

    const inputValue = { };

    const responseService = await productService.insert(inputValue);
    expect(responseService.status).to.equal('BAD_REQUEST');
    expect(responseService.data).to.deep.equal({
      message: '"name" is required',
    });
  });

  it('Test function update', async function () {
    const productModelStub = sinon.stub(productModel);

    productModelStub.findById.onFirstCall().resolves(productId);
    productModelStub.update.resolves(null);
    productModelStub.findById.onSecondCall().resolves({
      id: 2,
      name: 'Playstation 5',
    });

    const productInput = { name: 'Playstation 5' };
    const productIdInput = 2;

    const responseService = await productService.update(productInput, productIdInput);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal({
      id: 2,
      name: 'Playstation 5',
    });
  });

  it('The function update should return an error if the product does not exist', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const productInput = { name: 'Playstation 4' };
    const productIdInput = 999;

    const responseService = await productService.update(productInput, productIdInput);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data.message).to.deep.equal('Product not found');
  });

  it('The remove function should not call the model if the product does not exist', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const productIdInput = 999;

    const responseService = await productService.remove(productIdInput);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data.message).to.deep.equal('Product not found');
  });
});