import Joi from 'joi';

export const role = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        permissions: Joi.array().items(Joi.string().required()).required(),
    }),
};
