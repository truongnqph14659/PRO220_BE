import mongoose from 'mongoose';
import { roleModel } from '../models';
import _ from 'lodash';

export const createRole = async (data) => {
    return await new roleModel(data).save();
};

export const listRole = () => {
    return roleModel.find({});
};

export const listRolePermission = (name) => {
    return roleModel.aggregate([
        {
            $match: { name: name },
        },
        {
            $lookup: {
                from: 'permissions',
                localField: 'permissions',
                foreignField: '_id',
                as: 'permission_role',
            },
        },
        {
            $unwind: '$permission_role',
        },
        {
            $lookup: {
                from: 'permissions',
                localField: 'permission_role.parent',
                foreignField: '_id',
                as: 'permission_parent',
            },
        },
        {
            $unwind: '$permission_parent',
        },
        {
            $project: {
                _id: 1,
                name: 1,
                permissionId: '$permission_role._id',
                namePermision: '$permission_role.name',
                code: '$permission_role.code',
                cateName: '$permission_parent.name',
                cateId: '$permission_parent._id',
            },
        },
        {
            $group: {
                _id: '$cateId',
                name: { $first: '$cateName' },
                listPermissions: {
                    $push: '$$ROOT',
                },
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                listPermissions: {
                    _id: 1,
                    permissionId: 1,
                    namePermision: 1,
                    code: 1,
                },
            },
        },
    ]);
};

export const updateRolePermission = async (dataUpdate) => {
    return await roleModel.findByIdAndUpdate(
        dataUpdate.roleId,
        { $set: { permissions: dataUpdate.permissions } },
        { new: true },
    );
};
