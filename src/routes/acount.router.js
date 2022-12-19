import { Router } from 'express';
import { accountController, AuthController } from '../controllers';
import validate from '../middlewares/validate';
import { accountValidation } from '../validations';

const router = Router();

router.get('/accounts', accountController.getAll);
router.get('/account/:id', validate(accountValidation.getById), accountController.getById);
router.delete('/accounts/:id', validate(accountValidation.getById), accountController.removeById);
router.put(
    '/accounts/:id',
    validate(accountValidation.getById),
    validate(accountValidation.createAccount),
    accountController.updateById,
);
router.post('/login', validate(accountValidation.login), AuthController.login);
router.post('/register', validate(accountValidation.register), AuthController.register);
router.post('/refrehToken', AuthController.requestRefreshToken);

export default router;
