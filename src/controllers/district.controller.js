import _ from 'lodash';
import { districtService } from '../services';

export const getAll = async(req, res) => {
    try {
        const district = await districtService.getAll();
        res.json(district);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra không tìm thấy dữ liệu!',
        });
    }
};

export const getById = async(req, res) => {
    try {
        const district = await districtService.getById(req.params.id);
        res.json(district);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra!',
        });
    }
}

export const create = async(req, res) => {
    try {
        const district = await districtService.create(req.body);
        res.json(district);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra không thể thêm thấy dữ liệu!',
        });
    }
};

export const updateByIds = async(req, res) => {
    try {
        const data = await districtService.updateById(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể sửa!',
        });
    }
};