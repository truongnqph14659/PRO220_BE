import _ from 'lodash';
import { warehouseService } from '../services';

export const getWarehouseRelationalReferenced = async (req, res) => {
    try {
        const data = await warehouseService.getFullWarehouseInformation(req.params);
        const handleData = data[0].materials.filter((item) => item.materialId !== null);
        res.json({ handleData, totals: handleData.length });
    } catch (error) {
        res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể lấy dữ liệu!',
        });
    }
};

export const updateQuantityManyPartInWarehouse = (req, res) => {
    try {
        const data = warehouseService.updateWarehouseQuantity(req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể cập nhật dữ liệu!',
        });
    }
};

export const updateQuantityOnePartInWarehouse = (req, res) => {
    try {
        const data = warehouseService.updateWarehouseManyQuantity(req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể cập nhật dữ liệu!',
        });
    }
};

export const updateQuantityBackToWarehouse = (req, res) => {
    try {
        const data = warehouseService.updateQuantityMaterialBack(req.body);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể cập nhật dữ liệu!',
        });
    }
};
// filterWarehouseMaterial

export const filterMaterials = async (req, res) => {
    try {
        const data = await warehouseService.filterWarehouseMaterial(req);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể cập nhật dữ liệu!',
        });
    }
};
