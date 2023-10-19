const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { 
  salesFromDBAndSalesFromModel,
  saleId,
} = require('../Mocks/sales.mock'); 

describe('SALES SERVICE:', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Test function findAll', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromDBAndSalesFromModel);

    const responseService = await salesService.findAll();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(salesFromDBAndSalesFromModel);
  });

  it('Test function finById', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleId);

    const inputValue = 2;
    const responseService = await salesService.findById(inputValue);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(saleId);
  });

  it('Does not recover sale with non-existent id', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const inputValue = 999;
    const responseService = await salesService.findById(inputValue);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data.message).to.equal('Sale not found');
  });
});