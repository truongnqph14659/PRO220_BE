import { notifiPartModel } from '../models';

export const getAll = async () => {
    return await notifiPartModel.find({});
};

export const createNotification = async (data) => {
    return await new notifiPartModel(data).save();
};

export const deleteNotification = async (data) => {
    return await notifiPartModel.findOneAndDelete({ materialId: data.materialId, showroomId: data.showroomId });
};
