import _ from 'lodash';
import { BannerService } from '../services';

export const getAll = async (req, res) => {
    try {
        const category = await BannerService.getAll(req.query.filter);
        res.json(category);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra không tìm thấy dữ liệu!',
        });
    }
};

export const getById = async (req, res) => {
    try {
        const category = await BannerService.getById(req.params.id);
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
        const category = await BannerService.create(req.body);
        res.json(category);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra không thể thêm thấy dữ liệu!',
        });
    }
};

export const removeById = async (req, res) => {
    try {
        await BannerService.removeById(req.params.id);
        const dataDeleted = await BannerService.getById(req.params.id, { deleted: true });
        res.json(dataDeleted);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra xóa thất bại!',
        });
    }
};

export const removeByIds = async (req, res) => {
    try {
        BannerService.removeByIds(req.body.ids).then(async () => {
            //when remove succes check ids length = 1 => return data
            if (_.get(req.body.ids, 'length', 0) === 1) {
                const dataDeleted = await BannerService.getById(req.body.ids[0]);
                res.json({ ids: req.body.ids, dataDeleted });
                return;
            }
            res.json({ ids: req.body.ids, dataDeleted: null });
        });
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra xóa thất bại!',
        });
    }
};

export const updateById = async (req, res) => {
    try {
        const category = await BannerService.updateById(req.params.id, req.body);
        res.json(category);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra cập nhật thất bại!',
        });
    }
};
