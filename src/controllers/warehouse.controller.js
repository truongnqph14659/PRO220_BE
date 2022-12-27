import _ from 'lodash';
import {
    warehouseService
} from '../services';

export const create = async (req, res) => {
    try {
        const data = await warehouseService.create(req.body);
        res.status(200).json(data);
    } catch (errors) {
        res.status(400).json({
            errors,
            message: 'Đã có lỗi xảy ra không thể thêm dữ liệu!',
        });
    }
};


export const getWarehouseRelationalReferenced = async (req,res)=>{
    try {
        const data = await  warehouseService.getFullWarehouseInformation(req.params);
        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể lấy dữ liệu!',
        });
    }
}

export const updateShowroomWarehouseQuantity = (req,res)=>{
    try {
        const data = warehouseService.updateWarehouseQuantity(req.body);
        res.json(data);
    } catch (error) {
         res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể cập nhật dữ liệu!',
        });
    }
}

export const getFullWarehouse = async (req,res)=>{
    try {
         const data = await  warehouseService.getFullWarehouse();
        res.json(data);
    } catch (error) {
         res.status(400).json({
            error: 'Đã có lỗi xảy ra không thể cập nhật dữ liệu!',
        });
    }
}

