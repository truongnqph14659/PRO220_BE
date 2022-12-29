import { materialsService } from '../services';
import _ from 'lodash';

export const getAll = async (req, res) => {
    try {
        const data = await materialsService.getAll();
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong co don nao',
        });
    }
};

export const getById = async (req, res) => {
    try {
        const data = await materialsService.getById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong tim thay don nao',
        });
    }
};

export const create = async (req, res) => {
    try {
        const data = await materialsService.create(req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong them duoc',
        });
    }
};

export const removeById = async (req, res) => {
    try {
        await materialsService.removeById(req.params.id);
        const dataDeleted = await materialsService.getById(req.params.id, { deleted: true });
        res.json(dataDeleted);
    } catch (error) {
        res.status(400).json({
            error: 'khong xoa duoc',
        });
    }
};
export const removeByIds = async (req, res) => {
    try {
        materialsService.removeByIds(req.body.ids).then(async () => {
            if (_.get(req.body.ids, 'length', 0) === 1) {
                const dataDeleted = await materialsService.getById(req.body.ids[0]);
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
        const data = await materialsService.updateById(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'khong sua duoc',
        });
    }
};
