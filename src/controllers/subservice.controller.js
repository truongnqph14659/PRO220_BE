import { subService } from '../services';

export const getAll = async (req, res) => {
    try {
        const data = await subService.List();
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const createSubService = async (req, res) => {
    try {
        const data = await subService.create(req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const getByIdSubService = async (req, res) => {
    try {
        const data = await subService.getById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const removeByIdSubService = async (req, res) => {
    try {
        await subService.removeById(req.params.id);
        const dataDeleted = await subService.getById(req.params.id);
        res.json(dataDeleted);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const updateByIdSubService = async (req, res) => {
    try {
        const data = await subService.updateById(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
