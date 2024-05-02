import { string } from 'joi';
import mongoose from 'mongoose';
const districtSchema = mongoose.Schema({
    name: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: true
    }
}, { timestamps: true }, );

const districtModel = mongoose.model('District', districtSchema);

module.exports = districtModel;