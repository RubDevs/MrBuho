const Joi = require('@hapi/joi')

const productIdSchema = Joi.string().regex(/[0-9a-fA-F]{24}$/);
const productTagSchema = Joi.array().items(Joi.string().max(30));

const createProductSchema = {
  name: Joi
    .string()
    .max(50)
    .required(),
  description: Joi
    .string()
    .min(20)
    .max(1000000)
    .required(),
  image: Joi.string().required(),
  link: Joi.string().required(),
  tags: productIdSchema
};

const updateProductSchema = {
  name: Joi.string().max(50),
  description: Joi
    .string()
    .min(20)
    .max(1000000),
  image: Joi.string(),
  link: Joi.string(),
  tags: productTagSchema
};

module.exports = {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema
};
