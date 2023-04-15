import _ from 'lodash';
import mongoose from 'mongoose';
import { OrderModel, showroomModel } from '../models';

export const getAll = async (filter) => {
    return await OrderModel.find({
        ...filter,
        deleted: false,
    }).sort({
        createdAt: -1,
    });
};

export const getUserOrders = async (id) => {
    try {
        const data = await OrderModel.find({ accountId: id }).populate({
            path: 'showroomId',
            select: ['_id', 'nameShowroom', 'address', 'phone', 'images'],
        });

        return data.map((order) => {
            return {
                idOrder: order._id,
                nameUser: order.name,
                phoneUser: order.number_phone,
                serviceType: order.serviceType,
                status: order.status,
                appointmentSchedule: order.appointmentSchedule,
                showroom: order.showroomId,
                nameShowroom: order.showroomName,
                address: order.address,
            };
        });
    } catch (error) {}
};

export const create = async (data) => {
    const showroom = await showroomModel.findOne({ _id: data.showroomId });
    return await new OrderModel({ ...data, showroomName: showroom.name, showroomAddress: showroom.address }).save();
};

export const removeById = async (
    _id,
    filter = {
        deleted: false,
    },
) => {
    const orderId = mongoose.Types.ObjectId(_id);
    return await OrderModel.findOneAndDelete({
        _id: orderId,
        ...filter,
    }).exec();
};

export const removeByIds = async (ids = []) => {
    const result = ids.map(async (id) => {
        const orderById = await getById(id);
        if (!_.isEmpty(orderById)) {
            removeById(id);
        }
    });
    return result;
};

export const updateById = async (_id, data) => {
    return await OrderModel.findOneAndUpdate(
        {
            _id,
            deleted: false,
        },
        data,
        {
            new: true,
        },
    );
};

export const getById = async (id) => {
    try {
        const data = await OrderModel.aggregate([
            {
                $lookup: {
                    from: 'Material',
                    localField: 'materials.materialId',
                    foreignField: '_id',
                    as: 'materialOrder',
                },
            },
        ]);
        const dataReaults = handleMaterialsData(data, id);
        return dataReaults;
    } catch (error) {}
};

const handleMaterialsData = (data, id) => {
    const materials = data.find((material) => material._id == id);
    const listMaterials = materials.materialOrder.map((material, index) => {
        return {
            ...material,
            price: materials.materials[index].price,
            qty: materials.materials[index].qty,
        };
    });

    return {
        name: materials.name,
        email: materials.email,
        number_phone: materials.number_phone,
        status: materials.status,
        appointmentSchedule: materials.appointmentSchedule,
        serviceType: materials.serviceType,
        reasons: _.isEmpty(materials.reasons) ? '' : materials.reasons[0],
        materialIds: materials.materialIds,
        materials: materials.materials,
        showroomId: data.showroomId || materials.showroomId,
        showroomName: materials.showroomName,
        showroomAddress: materials.showroomAddress,
        subServices: materials.subServices,
        km: materials.km,
        vehicleType: materials.vehicleType,
        licensePlates: materials.licensePlates,
        soKhung: materials.soKhung,
        vehicleNumber: materials.vehicleNumber,
        tg_nhan_xe: materials.tg_nhan_xe,
        tg_tra_xe: materials.tg_tra_xe,
        gas: materials.gas,
        VAT: materials.VAT / 100,
        total: materials.total,
        totalWithVat: materials.totalWithVat,
        listMaterials,
        _id: id,
    };
};
