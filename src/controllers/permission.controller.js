import _ from 'lodash';
import { permissionService } from '../services';

export const create = async (req, res) => {
    try {
        const addPermission = await permissionService.createPermission(req.body);
        if (addPermission.messege == 'success') {
            const data = await permissionService.listPermissions();
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(400).json({
            error: 'tạo quyền thất bại',
        });
    }
};

export const list = async (req, res) => {
    try {
        const dataPermissions = await permissionService.listPermissions();
        res.status(200).json(dataPermissions);
    } catch (error) {
        res.status(400).json({
            error: 'lỗi, không thể lấy dữ liệu',
        });
    }
};

export const listOnePermission = async (req, res) => {
    try {
        const dataPermission = await permissionService.listPermissions();
        const permissionOne = dataPermission.find((permission) => permission._id == req.params.id);
        res.status(200).json(permissionOne);
    } catch (error) {
        res.status(400).json({
            error: 'lỗi, không thể lấy dữ liệu',
        });
    }
};

export const update = async (req, res) => {
    try {
        await permissionService.updatePermission(req.body);
        const dataPermissions = await permissionService.listPermissions();
        res.status(200).json(dataPermissions);
    } catch (error) {
        res.status(400).json({
            error: 'lỗi, không thể cập nhật dữ liệu',
        });
    }
};
