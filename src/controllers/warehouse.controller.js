import _ from 'lodash';
import { warehouseService } from '../services';
import { checkQuantityEnough, updateGeneralPart } from '../services/generalWarehouse.service';
import { findOnePartInWarehouse } from '../services/warehouse.service';

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
        const quantityWarehouse = await findOnePartInWarehouse(req.body);
        const quantityCaculator = req.body.material.quantity - quantityWarehouse[0].quantity;
        if (quantityCaculator <= generaWarehouselData.quantity) {
            await updateGeneralPart({
                idMaterial: req.body.material.materialId,
                quantity: generaWarehouselData.quantity - quantityCaculator,
            });
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

export const changeRequiredPart = async (req, res) => {
    try {
        const data = await warehouseService.changeRequired(req.body);
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể gửi yêu cầu!',
        });
    }
};

export const getOneRequiredPart = async (req, res) => {
    try {
        const data = await warehouseService.getOnePart(req.query);
        const handleData = {
            showroomId: data[0].showroomId,
            unit: data[0].dataMaterial.unit,
            key: data[0].dataMaterial._id,
            name: data[0].dataMaterial.name,
            quantity: data[0].materials.quantity,
        };
        res.status(200).json([handleData]);
    } catch (error) {
        res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể nhận yêu cầu, Thử lại sau!',
        });
    }
};
