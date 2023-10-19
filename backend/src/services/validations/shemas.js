const Joi = require('joi');

const addProductJoi = Joi.object({
  name: Joi.string().min(5),
});

module.exports = {
  addProductJoi,
};