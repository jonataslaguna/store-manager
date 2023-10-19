const router = require('express').Router();
const { salesController } = require('../controllers');

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.post('/', salesController.insertSale);

module.exports = router;