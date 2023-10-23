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

  it('Test function insert', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const inputValue = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    const sales = await salesModel.insert(inputValue);

    expect(sales).to.be.an('number');
    expect(sales).to.be.deep.equal(3);
  }); 

  it('Test function remove must call the execute function with the correct parameters', async function () {
    sinon.stub(connection, 'execute').resolves(null);

    const inputValue = 2;
    const expectedQuery = 'DELETE FROM sales WHERE id = ?';
    const expectedValues = [inputValue];

    await salesModel.remove(inputValue);

    expect(connection.execute.firstCall.args[0]).to.equal(expectedQuery);
    expect(connection.execute.firstCall.args[1]).to.deep.equal(expectedValues);
  }); 
});