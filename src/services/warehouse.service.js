import _ from 'lodash';
import mongoose from 'mongoose';
import { warehouseModel } from '../models';

export const create = (data) => {
    const warehouse = {
        showroomId: data.showroomId,
        materials: [...data.materials],
    };
    return new warehouseModel(warehouse).save();
};

export const getFullWarehouseInformation = async (data) => {
    return await warehouseModel
        .find({ deleted: false, showroomId: { _id: data.id } })
        .populate({ path: 'showroomId', select: 'name' })
        .populate({
            path: 'materials.materialId',
            match: { deleted: false },
            select: ['name', 'price', 'image', 'deleted'],
        })
        .exec();
};

export const updateWarehouseQuantity = (showroomWarehouse) => {
    return updateQuantityMaterials(showroomWarehouse);
};

export const updateWarehouseManyQuantity = (showroomWarehouse) => {
    return updateQuantityMaterial(showroomWarehouse);
};

const updateQuantityMaterials = (showroomWarehouse) => {
    showroomWarehouse.materials.forEach(async (material) => {
        try {
            const listCurrentMaterial = await warehouseModel.findOne({ 'materials.materialId': material.materialId });
            const materialObj = listCurrentMaterial.materials.find(
                (itemMateral) => itemMateral.materialId == material.materialId,
            );
            return await warehouseModel.updateOne(
                {
                    showroomId: mongoose.Types.ObjectId(showroomWarehouse.showroomId),
                    'materials.materialId': mongoose.Types.ObjectId(material.materialId),
                },
                {
                    $set: { 'materials.$.quantity': materialObj.quantity - material.qty },
                },
            );
        } catch (error) {
            return error;
        }
    });
};

const updateQuantityMaterial = async (dataObj) => {
    try {
        return await warehouseModel.updateOne(
            {
                showroomId: mongoose.Types.ObjectId(dataObj.idShowroom),
                'materials.materialId': mongoose.Types.ObjectId(dataObj.material.materialId),
            },
            {
                $set: { 'materials.$.quantity': dataObj.material.quantity },
            },
        );
    } catch (error) {
        return error;
    }
};
