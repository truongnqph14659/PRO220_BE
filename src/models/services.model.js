import mongoose from 'mongoose';
const serviceSchema = mongoose.Schema({
    serviceName: {
        type: String,
    },
    icon: {
        type: String,
    },
    serviceTypes: {
        type: [
            {
                typeName: {
                    type: String,
                },
                feeServiceType: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        default: [],
    },
});

const serviceModel = mongoose.model('Service', serviceSchema);

module.exports = serviceModel;
