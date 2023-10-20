const { expect } = require('chai');
const { validateUpdateProduct } = require('../../../src/middlewares/validateUpdateProduct'); 

describe('MIDDLEWARE VALIDATE UPDATE PRODUCT:', function () {
  it('Should return an error if the "name" property does not exist', function () {
    const req = {
      params: { id: 1 },
      body: { },
    };
    const res = {
      status: (code) => ({
        json: (data) => {
          expect(code).to.equal(400);
          expect(data).to.eql({ message: '"name" is required' });
        },
      }),
    };
    const next = () => {};

    validateUpdateProduct(req, res, next);
  });

  it('Should return an error if the "name" property is less than 5 characters', function () {
    const req = {
      params: { id: 1 },
      body: { name: 'a' },
    };
    const res = {
      status: (code) => ({
        json: (data) => {
          expect(code).to.equal(422);
          expect(data).to.eql({ message: '"name" length must be at least 5 characters long' });
        },
      }),
    };
    const next = () => {};

    validateUpdateProduct(req, res, next);
  });
});