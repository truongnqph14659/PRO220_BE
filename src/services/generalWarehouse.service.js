import { generalWarehouseModel } from '../models';

export const getAll = async () => {
    return generalWarehouseModel.aggregate([
        {
            $lookup: {
                from: 'materials',
                localField: 'materialId',
                foreignField: '_id',
                as: 'dataMaterial',
            },
        },
        {
            $unwind: '$dataMaterial',
        },
        {
            $project: {
                _id: 1,
                quantity: 1,
                name: '$dataMaterial.name',
                unit: '$dataMaterial.unit',
                idMaterial: '$dataMaterial._id',
            },
        },
    ]);
};

export const updateGeneralPart = async (partUpdate) => {
    return generalWarehouseModel.updateOne(
        {
            materialId: partUpdate.idMaterial,
        },
        {
            $set: { quantity: partUpdate.quantity },
        },
    );
};

export const createPartInGeneralWarehouse = async (dataPart) => {
    return new generalWarehouseModel({ materialId: dataPart.materialId, quantity: dataPart.quantity }).save();
};

export const checkQuantityEnough = async (dataPart) => {
    const handleCheck = await generalWarehouseModel.findOne({ materialId: dataPart.material.materialId });
    return handleCheck;
};
