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
            },
        ],
        default: [],
    },
});

const serviceModel = mongoose.model('Service', serviceSchema);

module.exports = serviceModel;
