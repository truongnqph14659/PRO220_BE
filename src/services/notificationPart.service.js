import { notifiPartModel } from '../models';

export const getAll = async () => {
    return await notifiPartModel.find({});
};

export const createNotification = async (data) => {
    return await new notifiPartModel(data).save();
};
