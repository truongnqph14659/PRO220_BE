import express from 'express';
import { districtController } from '../controllers';
import { DistrictValidation } from '../validations';
import validate from '../middlewares/validate';

const router = express.Router();

router.get('/province', districtController.getAll);
router.get('/province/:id', validate(DistrictValidation.getById), districtController.getById);
router.post('/province', validate(DistrictValidation.create), districtController.create);
router.patch(
    '/province/:id',
    // validate(DistrictValidation.create),
    validate(DistrictValidation.getById),
    districtController.updateByIds,
);
// router.get('/district/search?', '');

export default router;