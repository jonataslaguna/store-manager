const router = require('express').Router();
const { productController } = require('../controllers');
const { validateUpdateProduct } = require('../middlewares/validateUpdateProduct');

router.get('/', productController.findAll);

router.get('/:id', productController.findById);

router.post('/', productController.insert);

router.put(
  '/:id', 
  validateUpdateProduct,
  productController.updateProduct,
);

router.delete('/:id', productController.removeProduct);

module.exports = router;