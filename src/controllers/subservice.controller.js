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
