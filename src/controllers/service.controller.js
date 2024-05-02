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
