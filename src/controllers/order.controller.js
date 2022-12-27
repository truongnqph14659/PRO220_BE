import _ from 'lodash';
import { orderService } from '../services';

export const getAll = async (req, res) => {
    try {
        const showroomId = req.query.showroomId;
        if (showroomId) {
            const data = await orderService.getAll({
                showroomId,
            });
            res.json(data);
            return;
        }
        const data = await orderService.getAll();
        res.json(data);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra không tìm thấy dữ liệu!',
        });
    }
};

export const getById = async (req, res) => {
    try {
        const data = await orderService.getById(req.params.id);
        res.json(data);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra không tìm thấy dữ liệu!',
        });
    }
};

export const create = async (req, res) => {
    try {
        const data = await orderService.create(req.body);
        res.status(200).json(data);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra không thể thêm dữ liệu!',
        });
    }
};

const checkExistOrder = async (number_phone,licensePlates) => {
    try {
        const orders = await orderService.getAll({
            number_phone,
            licensePlates,
            status: { $nin: [0, 5] },
        });
        return orders
    } catch (error) {
        return error
    }

}

export const createOrderByCustomer = async (req, res) => {
    try {
        const { number_phone, licensePlates } = req.body;
        //check order da ton tai va dang trong qua trinh xu ly
        const orders = await checkExistOrder(number_phone, licensePlates)
        if (orders.length === 0) {
            const data = await orderService.create(req.body);
            res.status(200).json(data);
            return;
        }
        res.status(200).json({
            message:
                'Đơn hàng của bạn đang trong quá trình thực hiện. Vui lòng liên hệ quản lý cửa hàng hoặc xem đơn hàng (nếu có)!',
        });
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra không thể thêm dữ liệu!',
        });
    }
};

export const removeById = async (req, res) => {
    try {
        await orderService.removeById(req.params.id);
        const dataDeleted = await orderService.getById(req.params.id, {
            delete: true,
        });
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
        orderService.removeByIds(req.body.ids).then(async () => {
            if (_.get(req.body.ids, 'length', 0) === 1) {
                const dataDeleted = await orderService.getById(req.body.ids[0]);
                res.json({
                    ids: req.body.ids,
                    dataDeleted,
                });
                return;
            }
        });
        res.json({
            ids: req.body.ids,
            dataDeleted: null,
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
        const data = await orderService.updateById(req.params.id, req.body);
        res.json(data);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra cập nhật thất bại!',
        });
    }
};
