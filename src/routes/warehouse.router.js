import express from 'express';
import { warehouseController } from '../controllers';
import validate from '../middlewares/validate';
import { warehouseValidation } from '../validations';
const router = express.Router();

router.get(
    '/warehouses/:id',
    validate(warehouseValidation.warehouseIdShowroom),
    warehouseController.getWarehouseRelationalReferenced,
);

router.patch(
    '/warehouses',
    validate(warehouseValidation.warehouseMaterial),
    warehouseController.updateQuantityManyPartInWarehouse,
);

router.patch(
    '/warehouses/update-one',
    validate(warehouseValidation.warehouseMaterialUpdateOne),
    warehouseController.updateQuantityOnePartInWarehouse,
);

export default router;
