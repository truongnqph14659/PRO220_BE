import express from "express";
import { warehouseController } from '../controllers';
import validate from "../middlewares/validate";
import { warehouseValidation } from "../validations";
const router = express.Router();

router.get('/warehouses/:id', validate(warehouseValidation.warehouseIdShowroom),warehouseController.getWarehouseRelationalReferenced)
router.post('/warehouses',validate(warehouseValidation.warehouseMaterial),warehouseController.create);
router.patch('/warehouses',validate(warehouseValidation.warehouseMaterial),warehouseController.updateShowroomWarehousesQuantity)

export default router;