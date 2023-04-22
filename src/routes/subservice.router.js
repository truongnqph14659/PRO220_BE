import express from 'express';
import { SubServiceController } from '../controllers';

const router = express.Router();
router.get('/subService', SubServiceController.getAll);
router.post('/subService', SubServiceController.createSubService);
router.get('/subService/:id', SubServiceController.getByIdSubService);
router.delete('/subService/:id', SubServiceController.removeByIdSubService);
router.patch(
    '/subService/:id',
    SubServiceController.updateByIdSubService,
);

export default router;
