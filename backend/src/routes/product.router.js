const router = require('express').Router();
const { productController } = require('../controllers');

router.get('/', productController.findAll);

router.get('/:id', productController.findById);

router.post('/', productController.insert);

module.exports = router;