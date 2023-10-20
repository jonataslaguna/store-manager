const { expect } = require('chai');
const { validateNewSale } = require('../../../src/middlewares/validateNewSale'); 

describe('MIDDLEWARE VALIDATE NEW SALE:', function () {
  it('Should return an error if "productId" is missing', function () {
    const req = {
      body: [{ quantity: 5 }],
    };
    const res = {
      status: (code) => ({
        json: (data) => {
          expect(code).to.equal(400);
          expect(data).to.eql({ message: '"productId" is required' });
        },
      }),
    };
    const next = () => {};

    validateNewSale(req, res, next);
  });

  it('Should return an error if "quantity" is missing', function () {
    const req = {
      body: [{ productId: 3 }],
    };
    const res = {
      status: (code) => ({
        json: (data) => {
          expect(code).to.equal(400);
          expect(data).to.eql({ message: '"quantity" is required' });
        },
      }),
    };
    const next = () => {};

    validateNewSale(req, res, next);
  });

  it('Should return an error if "quantity" is less than 1', function () {
    const req = {
      body: [{ productId: 3, quantity: 0 }],
    };
    const res = {
      status: (code) => ({
        json: (data) => {
          expect(code).to.equal(422);
          expect(data).to.eql({ message: '"quantity" must be greater than or equal to 1' });
        },
      }),
    };
    const next = () => {};

    validateNewSale(req, res, next);
  });

  it('Should return an error if "productId" is less than 1', function () {
    const req = {
      body: [{ productId: 0, quantity: 1 }],
    };
    const res = {
      status: (code) => ({
        json: (data) => {
          expect(code).to.equal(400);
          expect(data).to.eql({ message: '"productId" is required' });
        },
      }),
    };
    const next = () => {};

    validateNewSale(req, res, next);
  });
});
