import express from 'express';
import { notificationPart } from '../controllers';

const router = express.Router();

router
    .route('/notification-part')
    .post(notificationPart.createNotificationPart)
    .get(notificationPart.getNotificationPart);

export default router;
