import mongoose from 'mongoose';

const discountSchema = mongoose.Schema(
    {
        code: {
            type: String,
        },
        name: {
            type: String,
        },
        discount_number: {
            type: Number,
        },
        type: {
            type: String,
        },
        quantity: {
            type: Number,
        },
        begin: {
            type: Date,
        },
        finish: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
);

const DiscountModel = mongoose.model('discount', discountSchema);

module.exports = DiscountModel;
