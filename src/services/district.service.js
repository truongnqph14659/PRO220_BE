import _ from 'lodash';
import { districtModel } from '../models';

export const getAll = async () => {
    return districtModel.find({});
};

export const getOneRelative = async () => {
    return districtModel.find({});
};

export const getById = async (id) => {
    return districtModel.findOne({ _id: id });
};

export const create = async (data) => {
    return await new districtModel(data).save();
};

export const updateById = async (_id, data) => {
    return await districtModel.findOneAndUpdate({ _id }, data, { new: true });
};
