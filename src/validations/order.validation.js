import Joi from "joi";
import {
    SEVICE_TYPE
} from "../constans/order";

export const createOrder = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        address: Joi.string().required(),
        number_phone: Joi.string().required(),
        subPrice: Joi.number().required(),
        description: Joi.string().required(),
    })
}

export const getById = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    })
}

export const deleteByIds = {
    body: Joi.object().keys({
        ids: Joi.array().items(Joi.string()),
    }),
};

// customer 

export const createOrderByCustomer = {
    body: Joi.object().keys({
        description: Joi.string().allow('', null),
        appointmentSchedule: Joi.date().required(),
        serviceType: Joi.number().required().default(SEVICE_TYPE.SHOWROOM),
        accountId: Joi.string().allow('', null),
        email: Joi.string().allow('', null),
        name: Joi.string().required(),
        number_phone: Joi.string().required(),
        showroomId: Joi.string().allow('', null),
        address: Joi.string().allow('', null),
        km: Joi.string().allow('', null),
        vehicleType: Joi.string().allow(1,2,3,4),
        licensePlates: Joi.string().required(),
    })
}