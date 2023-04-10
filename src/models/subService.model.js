import mongoose from 'mongoose';
const subserviceSchema = mongoose.Schema({
    name: {
        type: String,
    },
    fee: {
        type: Number,
    },
});

const subserviceModel = mongoose.model('subService', subserviceSchema);

module.exports = subserviceModel;
