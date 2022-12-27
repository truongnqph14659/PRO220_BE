import mongoose from 'mongoose';
import { ORDER_STATUS, SEVICE_TYPE } from '../constans/order';
var mongoose_delete = require('mongoose-delete');

const orderSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        number_phone: {
            type: String,
        },
        status: {
            default : ORDER_STATUS.initial.value,
            type: Number,
        },
        price: {
            type: Number,
        },
        subPrice: {
            type: Number,
        },
        total: {
            type: Number,
        },
        appointmentSchedule: {
            type: Date,
        },
        serviceType: {
            default : SEVICE_TYPE.SHOWROOM,
            type: Number,
        },
        description: {
            type: String,
        },
        eventId: {
            type: mongoose.ObjectId,
            ref: 'eventId',
        },
        accountId: {
            default: null,
            type: mongoose.ObjectId,
            ref: 'accountId',
        },
        showroomId: {
            type: mongoose.ObjectId,
            ref: 'showroomId',
        },
        materialIds: {
            type: mongoose.ObjectId,
            ref: 'materialIds',
        },
        //km xe chay
        km: {
            type: String,
        },
        // loai xe may
        vehicleType: {
            type: String,
        },
        //bien so xe
        licensePlates: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

orderSchema.plugin(mongoose_delete);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
