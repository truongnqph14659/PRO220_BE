import _ from 'lodash';
import mongoose from 'mongoose';
import { materialsModel } from '../models';

export const getAll = async () => {
    return materialsModel.find();
};

export const getById = async (_id) => {
    return await materialsModel.findOne({ _id }).exec();
};

export const create = async (data) => {
    return await new materialsModel(data).save();
};

export const removeById = async (_id, filter = { deleted: false }) => {
    const materialId = mongoose.Types.ObjectId(_id);
    return materialsModel.delete({ _id: materialId, ...filter });
};

export const removeByIds = async (ids = []) => {
    const result = ids.map(async (_id) => {
        const materialById = await getById(_id);
        if (!_.isEmpty(materialById)) {
            removeById(_id);
        }
    });
    return result;
};

export const updateById = async (_id, data) => {
    return await materialsModel.findOneAndUpdate({ _id }, data, { new: true });
};
