import Joi from 'joi';

export const createMaterials = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        image: Joi.string().required(),
        showroomId: Joi.string().required(),
        enabled: Joi.boolean().required(),
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
