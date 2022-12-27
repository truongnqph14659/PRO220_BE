import express from "express";
import { warehouseController } from '../controllers';
import validate from "../middlewares/validate";
import { warehouseValidation } from "../validations";
const router = express.Router();

router.get('/warehouses/:id', validate(warehouseValidation.getWarehouseIdShowroom),warehouseController.getWarehouseRelationalReferenced)
router.post('/warehouses',validate(warehouseValidation.validateWarehouseMaterial),warehouseController.create);
router.patch('/warehouses',validate(warehouseValidation.validateWarehouseMaterial),warehouseController.updateShowroomWarehouseQuantity)

export default router;