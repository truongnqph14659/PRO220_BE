import { number } from 'joi';
import mongoose from 'mongoose';
var mongoose_delete = require('mongoose-delete');
const warehouseSchema = mongoose.Schema(
    {
        showroomId: {
            type: mongoose.ObjectId,
            ref: 'Showroom',
        },
        materials: [
            {
                materialId: {
                    type: mongoose.ObjectId,
                    ref: 'Material',
                },
                quantity: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    { timestamps: true },
);
warehouseSchema.plugin(mongoose_delete);
const warehouseModel = mongoose.model('Warehouse', warehouseSchema);

module.exports = warehouseModel;
