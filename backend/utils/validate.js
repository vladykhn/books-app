const Joi = require('joi');

const columnList = ['id', 'title', 'date', 'author', 'description', 'image', 'store'];

const requestSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.date().iso().required(),
  image: Joi.string(),
}).options({ abortEarly: false });

const urlParamsSchema = Joi.object({
  offset: Joi.number().default(0),
  limit: Joi.number().default(20),
  sort: Joi.string().valid(columnList).default('id'),
}).options({ abortEarly: false });

const urlFilterSchema = Joi.object({
  title: Joi.string().length(100).default(false),
  date: Joi.date().iso().default(false),
  author: Joi.string().length(50).default(false),
  description: Joi.string().default(false),
  store: Joi.string().valid(['local', 'remote']).default(false),
}).options({ abortEarly: false });

module.exports = {
  validateBody: payload => requestSchema.validate(payload),
  validateParams: payload => urlParamsSchema.validate(payload),
  validateFilter: payload => urlFilterSchema.validate(payload),
};
