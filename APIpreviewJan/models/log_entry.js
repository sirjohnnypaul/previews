const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogEntrySchema = new Schema({
    no: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.new
    },
    ingredients: {
        type: String,
        required: true
    },
    process: {
        type: String,
        required: true
    }
}, {
    toJSON: {virtual: true },
    toObject: {virtuals: true}
})

LogEntrySchema.virtual('files', {
    ref: 'File',
    localField: '_id',
    foreignField: 'logEntryId'
})

module.exports = mongoose.model('LogEntry', LogEntrySchema)