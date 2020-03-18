const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    fileNameExtra: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('File', FileSchema)