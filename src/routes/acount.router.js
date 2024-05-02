import { Router } from 'express';
import { accountController, AuthController } from '../controllers';
import { verifyAndAdminAuth } from '../middlewares/auth';
import validate from '../middlewares/validate';
import { accountValidation } from '../validations';

const router = Router();

router.post('/accounts', accountController.getAll);
router.post('/account', validate(accountValidation.createAccount), accountController.create);
router.get('/account/:id', validate(accountValidation.getById), accountController.getById);
router.delete('/accounts/:id', validate(accountValidation.getById), accountController.removeById);
router.put('/accounts/:id', validate(accountValidation.getById), accountController.updateById);
router.post('/login', validate(accountValidation.login), AuthController.login);
router.post('/register', validate(accountValidation.register), AuthController.register);
router.post('/refrehToken', AuthController.requestRefreshToken);
router.post('/chagePassword/:id', accountController.changePassword);

export default router;
