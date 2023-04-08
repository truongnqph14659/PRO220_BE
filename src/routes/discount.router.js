import { Router } from 'express';
import { DiscountController } from '../controllers';
import validate from '../middlewares/validate';
import { DiscountValidation } from '../validations';

const router = Router();

router.get('/Discounts', DiscountController.getAll);
router.post('/Discount', validate(DiscountValidation.createDiscount), DiscountController.CreateDiscount);
router.put(
    '/Discount/:id',
    validate(DiscountValidation.getById),
    validate(DiscountValidation.createDiscount),
    DiscountController.UpdateDiscount,
);
router.delete('/Discount/:id', validate(DiscountValidation.getById), DiscountController.RemoveDiscount);
router.get('/Discount', DiscountController.findDiscount);

export default router;
