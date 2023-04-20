import { Service } from '../models';

export const list = async () => {
    return await Service.find();
};

export const getById = async (_id) => {
    return await Service.findOne({ _id }).exec();
};

export const create = async (data) => {
    return await new Service(data).save();
};

export const removeById = async (_id) => {
    return await Service.findOneAndDelete({ _id }).exec();
};

export const updateById = async (_id, data) => {
    return await Service.findOneAndUpdate({ _id }, data, { new: true });
};
