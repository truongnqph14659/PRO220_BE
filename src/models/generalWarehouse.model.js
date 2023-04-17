import mongoose from 'mongoose';
const generalWarehouseSchema = mongoose.Schema({
    materialId: {
        type: mongoose.ObjectId,
        ref: 'Material',
    },
    quantity: {
        type: Number,
        default: 0,
    },
});
const generalWarehouseModel = mongoose.model('generalwarehouse', generalWarehouseSchema);

module.exports = generalWarehouseModel;
