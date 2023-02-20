import express from 'express';
import { roleController } from '../controllers';
import validate from '../middlewares/validate';
import { RoleValidation } from '../validations';

const router = express.Router();

router.post('/role', validate(RoleValidation.role), roleController.create);
router.get('/role', roleController.list);
router.get('/roles/q?', roleController.listRolePermission);

export default router;
