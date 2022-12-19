import mongoose from 'mongoose';
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
            default : 1,
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
    },
    {
        timestamps: true,
    },
);

orderSchema.plugin(mongoose_delete);

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
