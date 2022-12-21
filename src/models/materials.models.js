var mongoose_delete = require('mongoose-delete');
import mongoose from 'mongoose';
const materialsSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);
materialsSchema.plugin(mongoose_delete);
const materialsModel = mongoose.model('materials', materialsSchema);
module.exports = materialsModel;
