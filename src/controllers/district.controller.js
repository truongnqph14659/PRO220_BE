import _ from 'lodash';
import { districtService } from '../services';

export const getAll = async (req, res) => {
    try {
        const category = await districtService.getAll();
        res.json(category);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra không tìm thấy dữ liệu!',
        });
    }
};

export const create = async (req, res) => {
    try {
        const category = await districtService.create(req.body);
        res.json(category);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra không thể thêm thấy dữ liệu!',
        });
    }
};
