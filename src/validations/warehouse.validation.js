import Joi from 'joi';

export const warehouseMaterial = {
    body: Joi.object().keys({
        showroomId: Joi.string().required(),
        materials: Joi.array()
            .items(
                Joi.object({
                    materialId: Joi.string(),
                    qty: Joi.number(),
                }),
            )
            .required(),
    }),
};

export const warehouseMaterialUpdateOne = {
    body: Joi.object().keys({
        idShowroom: Joi.string().required(),
        material: Joi.object({
            materialId: Joi.string(),
            quantity: Joi.number(),
        }).required(),
    }),
};

export const warehouseIdShowroom = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export const materialFilter = {
    query: Joi.object().keys({
        showroomId: Joi.string().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
};
