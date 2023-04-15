import { PostService } from '../services';
import _ from 'lodash';

export const getAll = async (req, res) => {
    try {
        const data = await PostService.getAll({ ...req.body });
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const create = async (req, res) => {
    try {
        const data = await PostService.create({ ...req.body });
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const removeById = async (req, res) => {
    try {
        const data = await PostService.removeById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const updateById = async (req, res) => {
    try {
        const data = await PostService.updateById(req.params.id, req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const getById = async (req, res) => {
    try {
        const data = await PostService.getById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

export const getByTitle = async (req, res) => {
    try {
        const data = await PostService.getByTitle(req.body.title);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
