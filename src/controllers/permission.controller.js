import _ from 'lodash';
import { permissionService } from '../services';

export const create = async (req, res) => {
    try {
        const listPermission = await fetchApiPermission();
        const handlePermissionName = listPermission.map((permission) => {
            return permission.nameCate[0].toLowerCase();
        });
        if (!_.some(handlePermissionName, (permission) => permission == req.body.name.toLowerCase())) {
            const addPermission = await permissionService.createPermission(req.body);
            if (addPermission.messege == 'success') {
                const data = await permissionService.listPermissions();
                res.status(200).json(data);
            }
        } else {
            res.status(409).json({ messege: 'Đã tồn tại danh mục quyền này trong hê thống' });
        }
    } catch (error) {
        res.status(400).json({
            error: 'tạo quyền thất bại',
        });
    }
};

export const list = async (req, res) => {
    try {
        const dataPermissions = await fetchApiPermission();
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

const fetchApiPermission = async () => {
    const dataPermission = await permissionService.listPermissions();
    return dataPermission;
};
