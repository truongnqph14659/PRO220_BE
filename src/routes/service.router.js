import express from 'express';
import { ServiceController } from '../controllers';
import validate from '../middlewares/validate';

const router = express.Router();

router.post('/service', ServiceController.createService);
router.get('/service', ServiceController.listService);

export default router;
