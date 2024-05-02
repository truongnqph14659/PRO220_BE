import mongoose from 'mongoose';
import { ORDER_STATUS, SEVICE_TYPE } from '../constans/order';
import { string } from 'joi';
var mongoose_delete = require('mongoose-delete');

const orderSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        email: {
            type: String,
        },
        number_phone: {
            type: String,
        },
        status: {
            default: ORDER_STATUS.initial.value,
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
            type: String,
        },
        description: {
            type: String,
        },
        eventId: {
            type: mongoose.ObjectId,
            ref: 'eventId',
        },
        accountId: {
            type: mongoose.ObjectId,
            ref: 'Account',
        },
        showroomId: {
            type: mongoose.ObjectId,
            ref: 'Showroom',
        },
        materialIds: {
            type: Array,
            default: [],
            ref: 'Material',
        },
        materials: [
            {
                materialId: {
                    type: mongoose.ObjectId,
                    ref: 'Material',
                },
                qty: {
                    type: Number,
                },
                price: {
                    type: Number,
                },
            },
        ],
        reasons: {
            type: Array,
            default: [],
        },
        //km xe chay
        km: {
            type: String,
        },
        // loai xe may
        vehicleType: {
            type: Number,
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
