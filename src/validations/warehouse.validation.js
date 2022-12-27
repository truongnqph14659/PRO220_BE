import Joi from "joi";
import { join } from "lodash";

export const validateWarehouseMaterial = {
    body: Joi.object().keys({
        showroomId: Joi.string().required(),
        materials:Joi.array().items(Joi.object({
          materialId:Joi.string(),
          quantity:Joi.number()
        })).required(),
    })
}

export const validateWarehouseIdShowroom = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    })
}
