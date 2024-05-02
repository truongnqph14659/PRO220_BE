import { PostModel } from '../models';

const baseFilter = { deleted: false };

export const getAll = async (filter = {}) => {
    const page = filter.page;
    const limit = filter.limit;
    return PostModel.find({
        ...baseFilter,
        ...filter,
    })
        .limit(limit)
        .skip(page)
        .sort({ createdAt: -1 });
};

export const getById = async (_id) => {
    return await PostModel.findOne({ _id }).exec();
};

export const getByTitle = async (title) => {
    return await PostModel.findOne({ title }).exec();
};

export const create = async (data) => {
    return await new PostModel(data).save();
};

export const removeById = async (_id) => {
    return await PostModel.findOneAndDelete({ _id }).exec();
};

export const updateById = async (_id, data) => {
    return await PostModel.findOneAndUpdate({ _id }, data, { new: true });
};

export const search = async (filter = null) => {
    return await PostModel.findOne({ ...filter, ...baseFilter });
};
