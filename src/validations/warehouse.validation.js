import Joi from "joi";

export const warehouseMaterial = {
    body: Joi.object().keys({
        showroomId: Joi.string().required(),
        materials:Joi.array().items(Joi.object({
          materialId:Joi.string(),
          quantity:Joi.number()
        })).required(),
    })
}

export const warehouseIdShowroom = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    })
}
