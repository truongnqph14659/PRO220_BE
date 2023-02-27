import mongoose from 'mongoose';
import { permissionModel } from '../models';
import _ from 'lodash';

export const createPermission = async (permission) => {
    const resData = await handlePermission({ name: permission.name, parent: null });
    permission.listPermissions.forEach(async (permissItem) => {
        await handlePermission({ name: permissItem.name, parent: resData._id, code: permissItem.code });
    });
    return;
};

const handlePermission = (data) => {
    return new permissionModel(data).save();
};

export const listPermissions = () => {
    return permissionModel.aggregate([
        {
            $group: {
                _id: '$parent',
                listPermissions: {
                    $push: '$$ROOT',
                },
            },
        },
        {
            $match: {
                _id: { $ne: null },
            },
        },
        {
            $lookup: {
                from: 'permissions',
                localField: '_id',
                foreignField: '_id',
                as: 'permission_parent',
            },
        },
        {
            $project: {
                _id: 1,
                nameCate: '$permission_parent.name',
                listPermissions: {
                    _id: 1,
                    name: 1,
                    code: 1,
                },
            },
        },
    ]);
};

export const updatePermission = async (data) => {
    const listCate = await permissionModel.find({ parent: data.idCate });
    listCate.forEach((item) => {
        const dataChecked = handleIsData(data.listPermissions, { code: item.code });
        if (!dataChecked) {
            handleDelete(item);
        }
    });

    data.listPermissions.forEach(async (permission) => {
        const dataChecked = handleIsData(listCate, { code: permission.code });
        if (!dataChecked) {
            await handlePermission({ name: permission.name, parent: data.idCate, code: permission.code });
        }
    });
};

const handleIsData = (listPermission, checkObj) => {
    return _.some(listPermission, checkObj);
};

const handleDelete = async (data) => {
    return await permissionModel.deleteOne({ _id: data._id });
};
