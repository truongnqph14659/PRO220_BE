var mongoose_delete = require('mongoose-delete');
import mongoose from 'mongoose';
const materialsSchema = mongoose.Schema({
    name: {
        type: String,
    },
    priceInitial: {
        type: Number,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
}, );
materialsSchema.plugin(mongoose_delete);
const materialsModel = mongoose.model('Material', materialsSchema);
module.exports = materialsModel;