import _ from 'lodash';
import { notifiPartService } from '../services';

export const createNotificationPart = async (req, res) => {
    try {
        const data = await notifiPartService.createNotification(req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'gửi yêu cầu thất bại, xin gửi lại',
        });
    }
};

export const getNotificationPart = async (req, res) => {
    try {
        const data = await notifiPartService.getAll();
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'error',
        });
    }
};
