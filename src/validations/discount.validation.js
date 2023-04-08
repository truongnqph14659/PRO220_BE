import Joi from 'joi';

export const createDiscount = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        discount_number: Joi.number().required(),
        type: Joi.string().required(),
        quantity: Joi.number().required(),
        begin: Joi.date().required(),
        finish: Joi.date().required(),
    }),
};

export const getById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};
