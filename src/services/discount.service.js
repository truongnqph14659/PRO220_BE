import { Discount } from '../models';

export const List = async () => {
    return await Discount.find();
};

export const Create = async (data) => {
    return await Discount(data).save();
};

export const UpdateById = async (_id, data) => {
    return await Discount.findOneAndUpdate({ _id }, data, { new: true });
};

export const removeById = async (_id) => {
    return await Discount.findOneAndDelete({ _id });
};

export const findDiscountonCode = async (code) => {
    return await Discount.findOne({ code: code });
};
