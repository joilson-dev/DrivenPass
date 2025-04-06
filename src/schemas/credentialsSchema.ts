import Joi from 'joi';

export const credentialSchema = Joi.object({
  title: Joi.string().required().min(3),
  url: Joi.string().uri().required(),
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(6),
});
