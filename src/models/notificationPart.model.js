import mongoose from 'mongoose';
const notiPartSchema = mongoose.Schema(
    {
        nameMaterial: {
            type: String,
        },
        nameShowroom: {
            type: String,
        },
        materialId: {
            type: String,
        },
        showroomId: {
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
