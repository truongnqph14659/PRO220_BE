import mongoose from 'mongoose';
const serviceSchema = mongoose.Schema({
    serviceName: {
        type: String,
    },
    icon: {
        type: String,
    }
});

const serviceModel = mongoose.model('Service', serviceSchema);

module.exports = serviceModel;
