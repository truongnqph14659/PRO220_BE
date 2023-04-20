import express from 'express';
import { ServiceController } from '../controllers';
import validate from '../middlewares/validate';

const router = express.Router();

router.post('/service', ServiceController.createService);
router.get('/service', ServiceController.listService);

router.get('/service/:id', ServiceController.getByIdService);
router.delete('/service/:id', ServiceController.removeByIdService);
router.patch(
    '/service/:id',
    ServiceController.updateByIdService,
);

export default router;
