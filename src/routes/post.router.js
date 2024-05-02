import { Router } from 'express';
import { PostController } from '../controllers';
import validate from '../middlewares/validate';
import { accountValidation } from '../validations';

const router = Router();

router.post('/posts', PostController.getAll);
router.post('/post', PostController.create);
router.get('/post/:id', PostController.getById);
router.post('/post-by-title', PostController.getByTitle);
router.delete('/post/:id', PostController.removeById);
router.patch('/post/:id', PostController.updateById);

export default router;
