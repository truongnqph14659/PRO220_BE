import mongoose from 'mongoose';
import { ORDER_STATUS, SEVICE_TYPE } from '../constans/order';
import { number, string } from 'joi';
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
            default: 0,
        },
        totalWithVat: {
            type: Number,
            default: 0,
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
        accountId: {
            type: mongoose.ObjectId,
            ref: 'Account',
        },
        showroomId: {
            type: mongoose.ObjectId,
            ref: 'Showroom',
        },
        showroomName: {
            type: String,
        },
        showroomAddress: {
            type: String,
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
                priceInitial: {
                    type: Number,
                },
                unit: {
                    type: String,
                    default: 'Cái',
                },
                name: {
                    type: String,
                },
            },
        ],
        subServices: {
            type: [
                {
                    _id: {
                        type: String,
                    },
                    name: {
                        type: String,
                    },
                    priceWorking: {
                        type: Number,
                        default: 0,
                    },
                },
            ],
            default: [],
        },
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
            type: String,
        },
        //bien so xe
        licensePlates: {
            type: String,
        },
        soKhung: {
            type: String,
        },
        vehicleNumber: {
            type: String,
        },
        gas: {
            type: String,
        },
        tg_nhan_xe: {
            type: Date,
        },
        tg_tra_xe: {
            type: Date,
        },
        VAT: {
            type: Number,
            default: 10,
        },
    },
    {
        timestamps: true,
    },
);

orderSchema.plugin(mongoose_delete);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
