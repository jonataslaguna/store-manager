const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

const {
  salesFromDBAndSalesFromModel, 
  saleId,
} = require('../Mocks/sales.mock');

describe('SALES MODEL:', function () {
  afterEach(function () {
    sinon.restore();
  });
    
  it('Test function findAll', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDBAndSalesFromModel]);
  
    const sales = await salesModel.findAll();
  
    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(3);
    expect(sales).to.be.deep.equal(salesFromDBAndSalesFromModel);
  });

  it('Test function finById', async function () {
    sinon.stub(connection, 'execute').resolves([saleId]);

    const inputValue = 2;
    const sales = await salesModel.findById(inputValue);

    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(1);
    expect(sales).to.be.deep.equal(saleId);
  });
});