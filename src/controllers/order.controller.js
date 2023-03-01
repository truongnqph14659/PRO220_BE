import _ from 'lodash';
import mongoose from 'mongoose';
import { OrderModel } from '../models';
import { orderService } from '../services';
import { getStartAndEndOfByTime } from '../utils/time';

const formatRequestFilterGetOrders = (body) => {
    const newBody = _.cloneDeep(body);
    for (const [key, value] of Object.entries(body)) {
        if (value.time && value.type) {
            const { start, end } = getStartAndEndOfByTime(value.type, value.time);
            const condition = {
                $lt: end,
                $gt: start,
            };
            newBody[key] = condition;
        }
    }
    return newBody;
};

export const getAll = async (req, res) => {
    try {
        const showroomId = req.query.showroomId;
        const filter = formatRequestFilterGetOrders(req.body);
        if (showroomId) {
            const data = await orderService.getAll({
                showroomId,
                ...filter,
            });
            res.json(data);
            return;
        }
        const data = await orderService.getAll(filter);
        res.json(data);
    } catch (errors) {
        console.log('errors-getAll-Order', errors);
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

const checkExistOrder = async (number_phone, licensePlates) => {
    try {
        const orders = await orderService.getAll({
            number_phone,
            licensePlates,
            status: { $nin: [0, 5] },
        });
        return orders;
    } catch (error) {
        return error;
    }
};

export const createOrderByCustomer = async (req, res) => {
    try {
        const { number_phone, licensePlates } = req.body;
        //check order da ton tai va dang trong qua trinh xu ly
        const orders = await checkExistOrder(number_phone, licensePlates);
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

export const getUserOrders = async (req, res) => {
    try {
        const data = await orderService.getUserOrders(req.params.accountId);
        res.json(data);
    } catch (error) {}
};

export const getOrderTotal = async (req, res) => {
    try {
        const { start, end } = getStartAndEndOfByTime(req.body.type, req.body.time);
        const data = await OrderModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $lt: end,
                        $gt: start,
                    },
                    showroomId: mongoose.Types.ObjectId(req.body.showroomId),
                },
            },
            {
                $project: {
                    status: 1,
                    createdAt: 1,
                },
            },
            {
                $sort: { createdAt: 1 },
            },
        ]);
        res.status(200).json(data);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra cập nhật thất bại!',
        });
    }
};

export const getOrderRevenua = async (req, res) => {
    try {
        const { start, end } = getStartAndEndOfByTime(req.body.type, req.body.time);
        const not_payment = await OrderModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $lt: end,
                        $gt: start,
                    },
                    showroomId: mongoose.Types.ObjectId(req.body.showroomId),
                    status: 4,
                },
            },
            {
                $project: {
                    status: 1,
                    createdAt: 1,
                    total: 1,
                },
            },
            {
                $sort: { createdAt: 1 },
            },
        ]);
        const paymented = await OrderModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $lt: end,
                        $gt: start,
                    },
                    showroomId: mongoose.Types.ObjectId(req.body.showroomId),
                    status: 5,
                },
            },
            {
                $project: {
                    status: 1,
                    createdAt: 1,
                    total: 1,
                },
            },
            {
                $sort: { createdAt: 1 },
            },
        ]);
        res.status(200).json({ paymented, not_payment });
    } catch (errors) {
        console.log('errors-getOrderRevenua', errors);
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra cập nhật thất bại!',
        });
    }
};
