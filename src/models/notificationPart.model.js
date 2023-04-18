import mongoose from 'mongoose';
const notiPartSchema = mongoose.Schema(
    {
        namePart: {
            type: String,
        },
        nameShowroom: {
            type: String,
        },
        idMaterial: {
            type: String,
        },
        idShowroom: {
            type: String,
        },
        imageShowroom: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);
const notiPartModel = mongoose.model('NotificationPart', notiPartSchema);
module.exports = notiPartModel;
