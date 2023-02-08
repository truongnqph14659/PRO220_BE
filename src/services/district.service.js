import _ from 'lodash';
import mongoose from 'mongoose';
import { districtModel } from '../models';

export const getAll = async () => {
    return districtModel.find({});
};

export const getOneRelative = async () => {
    return districtModel.find({});
};

export const create = async (data) => {
    return await new districtModel(data).save();
};
