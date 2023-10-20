const { expect } = require('chai');
const sinon = require('sinon');
const { validateProductExists } = require('../../../src/middlewares/validateProductExists'); 
const { productModel } = require('../../../src/models');

describe('MIDDLEWARE VALIDATE PRODUCT EXISTS:', function () {
  it('Should return an error if "productId" does not exist', function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const req = {
      body: [
        { productId: 999 },
        { quantity: 5 },
      ],
    };
    const res = {
      status: (code) => ({
        json: (data) => {
          expect(code).to.equal(404);
          expect(data).to.eql({ message: 'Product not found' });
        },
      }),
    };
    const next = () => {};

    validateProductExists(req, res, next);
  });
});