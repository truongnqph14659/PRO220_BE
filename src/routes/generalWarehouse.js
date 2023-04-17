import express from 'express';
import { generalWarehouse } from '../controllers';
const router = express.Router();

router.route('/general-warehouse').get(generalWarehouse.getAll).patch(generalWarehouse.updatePartGeneral);

export default router;
