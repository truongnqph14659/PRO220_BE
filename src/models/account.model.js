import mongoose from 'mongoose';

const accountSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        number_phone: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        showroomId:{
            type:String,
        },
        role: {
            type: Number,
        },
    },
    { timestamps: true },
);
const AccountModel = mongoose.model('Account', accountSchema);
module.exports = AccountModel;
