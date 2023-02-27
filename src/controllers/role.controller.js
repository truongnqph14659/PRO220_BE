import _ from 'lodash';
import { roleService } from '../services';

export const create = async (req, res) => {
    try {
        const roleData = await roleService.createRole(req.body);
        res.json(roleData);
    } catch (error) {
        res.status(400).json({
            error: 'tạo vai trò thất bại',
        });
    }
};

export const list = async (req, res) => {
    try {
        const roleData = await roleService.listRole();
        const handleRole = roleData.map((role) => {
            return {
                id: role._id,
                name: role.name,
            };
        });
        res.json(handleRole);
    } catch (error) {
        res.status(400).json({
            error: 'lỗi, lấy vai trò thất bại',
        });
    }
};

export const listRolePermission = async (req, res) => {
    try {
        const roleData = await roleService.listRolePermission(req.query.q);
        res.json(roleData);
    } catch (error) {
        res.status(400).json({
            error: 'lỗi, lấy dữ liệu thất bại',
        });
    }
};

export const updateRolePermission = async (req, res) => {
    const dataUpdate = await roleService.updateRolePermission(req.body);
    const roleData = await roleService.listRolePermission(dataUpdate.name);
    res.json(roleData);
    try {
    } catch (error) {
        res.status(400).json({
            error: 'lỗi, cập nhật vai trò thất bại',
        });
    }
};
