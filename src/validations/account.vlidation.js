import Joi from 'joi';

export const createAccount = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        number_phone: Joi.string().required(),
        email: Joi.string().allow(''),
        password: Joi.string().required(),
        roleId: Joi.string().required(),
        showroomId: Joi.string(),
    }),
};

export const register = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        number_phone: Joi.string().required(),
        email: Joi.string().allow(''),
        password: Joi.string().required(),
        image: Joi.string().allow(''),
        role: Joi.string().allow(''),
    }),
};

export const getById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export const login = {
    body: Joi.object().keys({
        number_phone: Joi.string().required(),
        password: Joi.string().required(),
    }),
};
