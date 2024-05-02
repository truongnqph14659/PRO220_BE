import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);
const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;
