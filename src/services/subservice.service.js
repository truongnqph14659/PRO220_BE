import { subService } from '../models';

export const List = async () => {
    return subService.find();
};

export const getById = async (_id) => {
    return await subService.findOne({ _id }).exec();
};

export const create = async (data) => {
    return await new subService(data).save();
};

export const removeById = async (_id) => {
    return await subService.findOneAndDelete({ _id }).exec();
};

export const updateById = async (_id, data) => {
    return await subService.findOneAndUpdate({ _id }, data, { new: true });
};