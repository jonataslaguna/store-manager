const router = require('express').Router();
const { salesController } = require('../controllers');
const { validateNewSale } = require('../middlewares/validateNewSale');
const { validateProductExists } = require('../middlewares/validateProductExists');

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.post(
  '/', 
  validateNewSale, 
  validateProductExists, 
  salesController.insertSale,
);

router.delete('/:id', salesController.removeSale);

module.exports = router;