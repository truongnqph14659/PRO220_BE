import _ from 'lodash';
import { permissionService } from '../services';

export const create = async (req, res) => {
    try {
        await permissionService.createPermission(req.body);
        const permissionData = await handleShowPermission();
        res.status(200).json(permissionData);
    } catch (error) {
        res.status(400).json({
            error: 'tạo quyền thất bại',
        });
    }
};

export const list = async (req, res) => {
    try {
        const dataPermissions = await handleShowPermission();
        res.status(200).json(dataPermissions);
    } catch (error) {
        res.status(400).json({
            error: 'lỗi, không thể lấy dữ liệu',
        });
    }
};

export const update = async (req, res) => {
    try {
        await permissionService.updatePermission(req.body);
        res.json({ messege: 'success' });
    } catch (error) {
        res.status(400).json({
            error: 'lỗi, không thể cập nhật dữ liệu',
        });
    }
};

const handleShowPermission = async () => {
    const data = await permissionService.listPermissions();
    const handlePermission = data.map((permission) => {
        return { ...permission, nameCate: permission.nameCate[0] };
    });
    return handlePermission;
};
