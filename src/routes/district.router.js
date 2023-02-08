import express from 'express';
import { districtController } from '../controllers';

const router = express.Router();

router.get('/district', districtController.getAll);
router.post('/district', districtController.create);
// router.get('/district/search?', '');

export default router;
