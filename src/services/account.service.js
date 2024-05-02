import { accountServiceModel } from '../models';

const baseFilter = { deleted: false };

export const getAll = async (filter) => {
    return accountServiceModel.find({
        ...baseFilter,
        ...filter,
    });
};

export const getById = async (_id) => {
    return await accountServiceModel.findOne({ _id }).populate('roleId').exec();
};

export const create = async (data) => {
    return await new accountServiceModel(data).save();
};

export const removeById = async (_id) => {
    return await accountServiceModel.findOneAndDelete({ _id }).exec();
};

export const updateById = async (_id, data) => {
    return await accountServiceModel.findOneAndUpdate({ _id }, data, { new: true });
};

export const getPhone = async (data) => {
    return await accountServiceModel.findOne({ number_phone: data });
};
export const search = async (filter = null) => {
    return await accountServiceModel.findOne({ ...filter, ...baseFilter });
};

export const getUserRole = async (filter = null) => {
    return await accountServiceModel.findOne({ ...filter, ...baseFilter }).populate('roleId');
};
