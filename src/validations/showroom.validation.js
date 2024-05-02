import Joi from "joi";

export const create = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        images: Joi.array().items(Joi.string()).required(),
        longitude: Joi.string().required(),
        latitude: Joi.string().required(),
        districtId: Joi.string().required()
    })
}

export const deleteIds = {
    body: Joi.object().keys({
        ids: Joi.array().items(Joi.string()).required()
    })
}

export const getById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    })
}

export const updateById = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        images: Joi.array().items(Joi.string()).required(),
        longitude: Joi.string().required(),
        latitude: Joi.string().required(),
        districtId: Joi.string().required()
    })
}

export const userLocation = {
    body: Joi.object().keys({
        longitude: Joi.string().required(),
        latitude: Joi.string().required(),
        dist: Joi.number().required()
    })
}