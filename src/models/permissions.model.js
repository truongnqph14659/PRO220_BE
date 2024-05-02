import mongoose from 'mongoose';
const permissionSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission',
        },
        code: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
);
const permissionModel = mongoose.model('Permission', permissionSchema);
module.exports = permissionModel;
