import _ from 'lodash';
import mongoose from 'mongoose';
import {
  warehouseModel
} from '../models'

export const create = (data) => {
    const warehouse = {
        showroomId:data.showroomId,
        materials:[
            ...data.materials
        ]
    };
    return new warehouseModel(warehouse).save();
};

export const getFullWarehouseInformation = async(data)=>{
    return warehouseModel.find({deleted: false,showroomId:{_id:data.id}}).populate({ path: 'showroomId', select: 'name' }).populate({ path: 'materials.materialId', select: ['name','quantity','price','deleted']}).exec()
}

export const updateWarehouseQuantity = (showroomWarehouse)=>{
    return  updateQuantityMaterial(showroomWarehouse)
}

const updateQuantityMaterial = (showroomWarehouse)=>{
    showroomWarehouse.materials.forEach(async(material)=>{
        try {
            await warehouseModel.updateOne({
                'showroomId': mongoose.Types.ObjectId(showroomWarehouse.showroomId),
                'materials.materialId': mongoose.Types.ObjectId(material.materialId)
            },
            {
            $set:{"materials.$.quantity":material.quantity - 1}  
            }
        ) 
        } catch (error) {
            return error
        }
    })
}