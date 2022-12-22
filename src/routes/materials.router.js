import express from 'express';
import { materialController } from '../controllers';
import validate from '../middlewares/validate';
import { materialValidation } from '../validations';

const router = express.Router();

router.get('/material', materialController.getAll);
router.get('/material/:id', validate(materialValidation.getById), materialController.getById);
router.post('/material', validate(materialValidation.createMaterials), materialController.create);
router.delete('/material/:id', validate(materialValidation.getById), materialController.removeById);
router.delete('/material', validate(materialValidation.deleteByIds), materialController.removeByIds);
router.patch(
    '/material/:id',
    validate(materialValidation.createMaterials),
    validate(materialValidation.getById),
    materialController.updateById,
);
export default router;
