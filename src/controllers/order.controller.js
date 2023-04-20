import _ from 'lodash';
import mongoose from 'mongoose';
import { OrderModel } from '../models';
import { accountServices, orderService } from '../services';
import { getStartAndEndOfByTime } from '../utils/time';
import { Twilio } from 'twilio';
import dayjs from 'dayjs';
const accountSid = 'ACe3fb52ccb075caca32e44905e4baf5fb';
const authToken = 'ab3ecf45e8a759b71f25105953f01ce3';

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
        const phone = await checkPhone(req.body.number_phone);
        if (phone != null) {
            const data = await orderService.create({ ...req.body, accountId: phone._id });
            res.status(200).json(data);
        } else {
            const dataAcc = await accountServices.create({
                name: req.body.name,
                number_phone: req.body.number_phone,
            });
            const dataOrder = await orderService.create({ ...req.body, accountId: dataAcc._id });
            res.status(200).json(dataOrder);
        }
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
        let handleData = req.body;
        if (handleData.status == 4) {
            const madeVat = handleData.total + handleData.total * 0.1;
            handleData = { ...handleData, totalWithVat: madeVat };
        }
        const data = await orderService.updateById(req.params.id, handleData);
        // không được phép xóa code bên dưới

        // if (handleData.status == 2 && handleData.isCustomer == true) {
        //     const client = new Twilio(accountSid, authToken);
        //     await client.messages.create({
        //         body: `${handleData.showroomName} xác nhận đặt lịch ${handleData.serviceType}, vào lúc ${dayjs(
        //             handleData.appointmentSchedule,
        //         ).format('HH:mm DD/MM/YYYY')}`,
        //         from: '+16203028652',
        //         to: `+84${handleData.number_phone}`,
        //     });
        // }

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
                    appointmentSchedule: {
                        $lt: end,
                        $gt: start,
                    },
                    showroomId: mongoose.Types.ObjectId(req.body.showroomId),
                },
            },
            {
                $project: {
                    status: 1,
                    appointmentSchedule: 1,
                },
            },
            {
                $sort: { appointmentSchedule: 1 },
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
        const data = await OrderModel.aggregate([
            {
                $match: {
                    tg_nhan_xe: {
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
                    tg_nhan_xe: 1,
                    total: 1,
                    materials: 1,
                },
            },
            {
                $sort: { tg_nhan_xe: 1 },
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

export const checkPhoneInSystem = async (req, res) => {
    try {
        const phone = await checkPhone(req.body.number_phone);
        if (phone == null) {
            res.status(200).json({
                isPhoneInSystem: false,
            });
        } else {
            res.status(200).json({
                isPhoneInSystem: true,
                name: phone.name,
                accountId: phone.id,
                email: phone.email,
                number_phone: phone.number_phone,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: 'Đã có lỗi xảy ra!',
        });
    }
};

const checkPhone = async (phone) => {
    return await accountServices.getPhone(phone);
};

export const getShowroom = async (req, res) => {
    try {
        console.log(req.body.id);
        const data = await orderService.getOderShowroom(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            message: 'Đã có lỗi xảy ra!',
        });
    }
};

export const getAllNotificationOrder = async (req, res) => {
    try {
        const data = await orderService.notifiCationInOrder(req.body.showroomId);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'lỗi',
        });
    }
};

export const updateSeenNotification = async (req, res) => {
    try {
        const data = await orderService.updateSeenOrder(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'lỗi',
        });
    }
};
