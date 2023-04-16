import _ from 'lodash';
import { warehouseService } from '../services';
import { checkQuantityEnough } from '../services/generalWarehouse.service';

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

export const updateQuantityOnePartInWarehouse = async (req, res) => {
    try {
        const generaWarehouselData = await checkQuantityEnough(req.body);
        if (req.body.material.quantity <= generaWarehouselData.quantity) {
            const data = warehouseService.updateWarehouseManyQuantity(req.body);
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
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

export const getDataExchangePart = async (req, res) => {
    try {
        const data = await warehouseService.GetExchangeQuantityWarehouse(req.query.idShowroom);
        const dataHandle = data.map((item) => {
            const materialFilter = item.materials.find((item) => item.materialId == req.query.materialId);
            return {
                ...materialFilter,
                name: item.dataShowroom.name,
                address: item.dataShowroom.address,
                idShowroom: item.dataShowroom._id,
                province: item.dataDistrict.name,
            };
        });

        const dataFilter = dataHandle.filter((item) => item.quantity > 0 && item.idShowroom != req.query.idShowroom);

        res.status(200).json({
            dataFilter,
        });
    } catch (error) {
        res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể lấy dữ liệu!',
        });
    }
};

export const exchangePartQuantity = async (req, res) => {
    try {
        const data = await warehouseService.exchangeQuantityMaterial(req.body);
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể cập nhật dữ liệu!',
        });
    }
};
