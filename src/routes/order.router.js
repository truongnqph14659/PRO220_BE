import express from 'express';
import { orderController } from '../controllers';
import validate from '../middlewares/validate';
import { orderValidation } from '../validations';

const router = express.Router();

router.get('/orders', orderController.getAll);
router.post('/orders-filter', orderController.getAll);
router.get('/orders/:id', validate(orderValidation.getById), orderController.getById);
router.post('/orders', validate(orderValidation.createOrder), orderController.create);
router.delete('/orders/:id', validate(orderValidation.getById), orderController.removeById);
router.delete('/orders', validate(orderValidation.deleteByIds), orderController.removeByIds);
router.patch(
    '/orders/:id',
    validate(orderValidation.createOrder),
    validate(orderValidation.getById),
    orderController.updateById,
);
router.patch('/order-status/:id', validate(orderValidation.updateOrderStatus), orderController.updateById);
//customer
router.post('/order-by-customer', validate(orderValidation.createOrderByCustomer), orderController.create);
router.get('/orders-customer/:accountId', orderController.getUserOrders);
router.patch('/orders-customer/:id', validate(orderValidation.updateByIdOrder), orderController.updateById);

// thong ke
router.post('/order/statistical-total', validate(orderValidation.totalOrderStatistical), orderController.getOrderTotal);
router.post(
    '/order/statistical-revenue',
    validate(orderValidation.totalOrderStatistical),
    orderController.getOrderRevenua,
);

export default router;
