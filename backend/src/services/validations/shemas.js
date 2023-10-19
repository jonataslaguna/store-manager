const Joi = require('joi');

const addProductJoi = Joi.object({
  name: Joi.string().min(3),
});

module.exports = {
  addProductJoi,
};