import Joi from 'joi';
import { SEVICE_TYPE } from '../constans/order';

export const createOrder = {
    body: Joi.object().keys({
        description: Joi.string().allow('', null),
        appointmentSchedule: Joi.date().allow('', null),
        serviceType: Joi.number().required().default(SEVICE_TYPE.SHOWROOM),
        email: Joi.string().allow('', null),
        price: Joi.number().allow('', null),
        subPrice: Joi.number().allow('', null),
        total: Joi.number().allow('', null),
        showroomId: Joi.string().allow('', null),
        name: Joi.string().required(),
        number_phone: Joi.string().required(),
        status: Joi.number().required().allow(2),
        licensePlates: Joi.string().allow('', null),
        reasons: Joi.array().items(Joi.string()).empty(),
        materialIds: Joi.array().items(Joi.string()).empty(),
        materials: Joi.array().items().empty(),
    }),
};

export const updateOrderStatus = {
    body: Joi.object().keys({
        status: Joi.number().required(),
        reasons: Joi.array().items(Joi.string()).empty(),
        materialIds: Joi.array().items(Joi.string()).empty(),
        materials: Joi.array().items().empty(),
        total: Joi.number().allow('', null),
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

// customer

export const createOrderByCustomer = {
    body: Joi.object().keys({
        description: Joi.string().allow('', null),
        appointmentSchedule: Joi.date().allow('', null),
        serviceType: Joi.number().required().default(SEVICE_TYPE.SHOWROOM),
        accountId: Joi.string().allow('', null),
        email: Joi.string().allow('', null),
        name: Joi.string().required(),
        number_phone: Joi.string().required(),
        showroomId: Joi.string().allow('', null),
        licensePlates: Joi.string().allow('', null),
    }),
};

export const updateByIdOrder = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        status: Joi.number().required(),
    }),
};

export const totalOrderStatistical = {
    body: Joi.object().keys({
        type: Joi.string().required(),
        showroomId: Joi.string().required(),
        time: Joi.alternatives().try(Joi.date(), Joi.array().items(Joi.date())),
    }),
};

export const phone = {
    body: Joi.object().keys({
        number_phone: Joi.string().required(),
    }),
};
