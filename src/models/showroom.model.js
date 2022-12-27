import mongoose from "mongoose";
var mongoose_delete = require('mongoose-delete');
const showroomSchema = mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    images:[],
    location: {
        type: {
          type: String
        },
        coordinates: []
    },
})
showroomSchema.index({ location: '2dsphere' })
showroomSchema.plugin(mongoose_delete);
const showroomModel = mongoose.model('Showroom', showroomSchema);

module.exports = showroomModel;