import Joi from 'joi';

export const role = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        permissions: Joi.array().items(Joi.string().required()).required(),
    }),
};

export const roleUpdate = {
    body: Joi.object().keys({
        roleId: Joi.string().required(),
        permissions: Joi.array().items(Joi.string().required()).required(),
    }),
};
