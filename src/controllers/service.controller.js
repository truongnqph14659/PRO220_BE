import { ServiceType } from '../services';
import _ from 'lodash';

export const createService = async (req, res) => {
    try {
        const data = await ServiceType.create(req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const listService = async (req, res) => {
    try {
        const data = await ServiceType.list();
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const getByIdService = async (req, res) => {
    try {
        const data = await ServiceType.getById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const removeByIdService = async (req, res) => {
    try {
        await ServiceType.removeById(req.params.id);
        const dataDeleted = await ServiceType.getById(req.params.id);
        res.json(dataDeleted);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const updateByIdService = async (req, res) => {
    try {
        const data = await ServiceType.updateById(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};