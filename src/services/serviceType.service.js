import { Service } from '../models';

export const create = async (data) => {
    return await new Service(data).save();
};

export const list = async () => {
    return await Service.find({});
};
