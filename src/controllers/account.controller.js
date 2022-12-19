import bcyrpt from 'bcrypt';
import { accountServices } from '../services';

export const getAll = async (req, res) => {
    try {
        const data = await accountServices.getAll();
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const create = async (req, res) => {
    try {
        const Number_Phone = await accountServices.getPhone(req.body.number_phone);
        if (Number_Phone) {
            return res.json({
                message: 'Số điện thoại đã tồn tại',
            });
        }
        const passwordVerify = bcyrpt.hashSync(req.body.password, 10);
        const data = await accountServices.create({ ...req.body, password: passwordVerify });
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
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
        const data = await accountServices.updateById(req.params.id, req.body);
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
