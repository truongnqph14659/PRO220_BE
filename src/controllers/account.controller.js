import bcyrpt from 'bcrypt';
import { accountServices } from '../services';
import _ from 'lodash';
import { STATUS_TYPE } from '../constans/status';

export const getAll = async (req, res) => {
    try {
        const existsRoleId = {
            roleId: { $exists: true },
        };
        const data = await accountServices.getAll({ ...existsRoleId, ...req.body });
        const resual = data.filter((item) => item.roleId);
        console.log(resual);
        res.json(resual);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const data = await accountServices.getAllUser();
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: 'không tìm thấy dữ liệu',
        });
    }
};

export const create = async (req, res) => {
    try {
        const checkPhoneNumber = await accountServices.search({ number_phone: req.body.number_phone });
        if (!checkPhoneNumber) {
            const passwordVerify = bcyrpt.hashSync(req.body.password, 10);
            const data = await accountServices.create({ ...req.body, password: passwordVerify });
            return res.status(200).json({ data, message: 'Tạo tài khoản thành công!' });
        }
        res.status(400).json({
            message: 'Tài khoản đã tồn tại trong hệ thống!',
        });
    } catch (error) {
        res.status(400).json({
            error,
            message: 'Đăng ký tài khoản thất bại! Vui lòng thử lại.',
        });
    }
};

export const removeById = async (req, res) => {
    try {
        const data = await accountServices.removeById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const updateById = async (req, res) => {
    try {
        let value = {};
        if (_.has(req.body, 'password')) {
            value = {
                ...req.body,
                password: bcyrpt.hashSync(req.body.password, 10),
            };
        } else {
            value = {
                ...req.body,
            };
        }
        const data = await accountServices.updateById(req.params.id, value);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const getById = async (req, res) => {
    try {
        const data = await accountServices.getById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const data = await accountServices.getById(req.params.id);
        const compareSync = bcyrpt.compareSync(req.body.currentPassword, _.get(data, 'password'));
        const status = compareSync ? STATUS_TYPE.SUCCESS : STATUS_TYPE.ERROR;
        res.json(status);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
