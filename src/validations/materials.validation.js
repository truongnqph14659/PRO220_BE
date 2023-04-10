import Joi from 'joi';

export const createMaterials = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        priceInitial: Joi.number().required(),
        price: Joi.number().required(),
        image: Joi.string().required(),
        unit: Joi.string().required(),
        quantity: Joi.number().allow('', null),
    }),
};
export const getById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};
export const deleteByIds = {
    body: Joi.object().keys({
        ids: Joi.array().items(Joi.string()),
    }),
};

export const filter = {
    query: Joi.object().keys({
        value: Joi.string().required(),
    }),
};
