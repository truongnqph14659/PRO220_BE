import _ from 'lodash';
import mongoose from 'mongoose';
import {
    OrderModel
} from "../models";

export const getAll = async (filter = null) => {
    return await OrderModel.find({
        ...filter,
        deleted: false,
    });
}

export const getById = async (_id, filter = {
    deleted: false
}) => {
    return await OrderModel.findOne({
        _id,
        ...filter
    }).exec();
}

export const create = async (data) => {
    return await new OrderModel(data).save()
}

export const removeById = async (_id, filter = {
    deleted: false
}) => {
    const orderId = mongoose.Types.ObjectId(_id);
    return await OrderModel.findOneAndDelete({
        _id: orderId,
        ...filter
    }).exec()
}

export const removeByIds = async (ids = []) => {
    const result = ids.map(async (id) => {
        const orderById = await getById(id);
        if (!_.isEmpty(orderById)) {
            removeById(id)
        }
    })
    return result;
}

export const updateById = async (_id, data) => {
    return await OrderModel.findOneAndUpdate({
        _id,
        deleted: false
    }, data, {
        new: true
    })
}