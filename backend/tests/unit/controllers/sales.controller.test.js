const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');

const { 
  salesFromServiceSuccessful, 
  salesFromDBAndSalesFromModel, 
  saleId, 
  saleFromServiceSuccessful,
  saleFromServiceNotFound,
} = require('../Mocks/sales.mock');

describe('SALES CONTROLLER:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Test function findAll', async function () {
    sinon.stub(salesService, 'findAll').resolves(salesFromServiceSuccessful);
  
    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await salesController.findAll(req, res);
  
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromDBAndSalesFromModel);
  });

  it('Test function findById', async function () {
    sinon.stub(salesService, 'findById').resolves(saleFromServiceSuccessful);

    const req = { params: { id: 2 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleId);
  });

  it('Does not recover sale with non-existent id', async function () {
    sinon.stub(salesService, 'findById').resolves(saleFromServiceNotFound);

    const req = { params: { id: 999 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(saleFromServiceNotFound.data);
  });
});