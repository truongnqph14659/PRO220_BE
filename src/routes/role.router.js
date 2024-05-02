import express from 'express';
import { roleController } from '../controllers';
import validate from '../middlewares/validate';
import { RoleValidation } from '../validations';

const router = express.Router();

router.post('/role', validate(RoleValidation.role), roleController.create);
router.get('/role', roleController.list);
router.patch('/role', validate(RoleValidation.roleUpdate), roleController.updateRolePermission);
router.get('/roles/q?', roleController.listRolePermission);

export default router;
