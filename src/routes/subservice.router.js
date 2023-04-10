import express from 'express';
import { SubServiceController } from '../controllers';

const router = express.Router();
router.get('/subService', SubServiceController.getAll);

export default router;
