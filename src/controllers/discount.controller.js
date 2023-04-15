import { Discount } from '../services';

export const getAll = async (req, res) => {
    try {
        const data = await Discount.List();
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: 'Đã có lỗi xảy ra không tìm thấy dữ liệu!',
        });
    }
};

export const CreateDiscount = async (req, res) => {
    try {
        const value = {
            code: `${Math.floor(Math.random() * (999 - 100 + 1) + 100)}`,
            ...req.body,
        };
        const data = await Discount.Create(value);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: 'Đã có lỗi xảy ra không thêm được dữ liệu!',
        });
    }
};

export const RemoveDiscount = async (req, res) => {
    try {
        const data = await Discount.removeById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: 'Đã có lỗi xảy ra không thể xóa dữ liệu!',
        });
    }
};

export const UpdateDiscount = async (req, res) => {
    try {
        const data = await Discount.UpdateById(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: 'Đã có lỗi xảy ra không thể cập nhập dữ liệu!',
        });
    }
};

export const findDiscount = async (req, res) => {
    try {
        const data = await Discount.findDiscountonCode(req.body.code);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: 'Đã có lỗi xảy ra không thể cập nhập dữ liệu!',
        });
    }
};
