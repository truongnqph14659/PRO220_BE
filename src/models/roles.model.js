import mongoose from 'mongoose';
const rolesSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        permissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Permission',
            },
        ],
    },
    {
        timestamps: true,
    },
);
const rolesModel = mongoose.model('Role', rolesSchema);
module.exports = rolesModel;
