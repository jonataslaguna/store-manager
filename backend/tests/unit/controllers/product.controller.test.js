const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { 
  productsFromServiceSuccessful, 
  productsFromModel, 
  productFromServiceSuccessful,
  productId,
  productFromServiceNotFound,
  productsInsertFromServiceSuccessful,
  productCreated,
  productsInsertFromServiceInvalidValue,
} = require('../Mocks/product.mock');

describe('PRODUCT CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Test function findAll', async function () {
    sinon.stub(productService, 'findAll').resolves(productsFromServiceSuccessful);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Test function findById', async function () {
    sinon.stub(productService, 'findById').resolves(productFromServiceSuccessful);

    const req = { params: { id: 2 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productId);
  });

  it('Does not recover product with non-existent id', async function () {
    sinon.stub(productService, 'findById').resolves(productFromServiceNotFound);

    const req = { params: { id: 999 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(productFromServiceNotFound.data);
  });

  it('Test function insert', async function () {
    sinon.stub(productService, 'insert').resolves(productsInsertFromServiceSuccessful);

    const inputValue = { name: 'Playstation 5' };

    const req = { params: { }, body: inputValue };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.insert(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productCreated);
  });

  it('Test whether it does not add if the data is incorrect', async function () {
    sinon.stub(productService, 'insert').resolves(productsInsertFromServiceInvalidValue);

    const inputValue = { name: 'P' };

    const req = { params: { }, body: inputValue };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.insert(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(productsInsertFromServiceInvalidValue.data);
  });

  it('Test updateProduct', async function () {
    sinon.stub(productService, 'update').resolves(productFromServiceSuccessful);

    const inputValue = { name: 'Traje de encolhimento' };

    const req = { params: { id: 2 }, body: inputValue };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productFromServiceSuccessful.data);
  });

  it('The function update should return an error if the product does not exist', async function () {
    sinon.stub(productService, 'update').resolves(productFromServiceNotFound);

    const inputValue = { name: 'Traje de encolhimento' };

    const req = { params: { id: 9999 }, body: inputValue };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(productFromServiceNotFound.data);
  });

  it('Test function remove', async function () {
    sinon.stub(productService, 'remove').resolves(null);

    const req = { params: { id: 2 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      end: sinon.stub(),
    };
  
    await productController.removeProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('The function remove should return an error if the product does not exist', async function () {
    sinon.stub(productService, 'remove').resolves(productFromServiceNotFound);

    const req = { params: { id: 9999 }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productController.removeProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(productFromServiceNotFound.data);
  });
});