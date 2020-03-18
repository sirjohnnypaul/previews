const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: String,
    surname: String,
    number: String,
    inkLevelData:  [{
        type: Schema.Types.ObjectId,
        ref: 'ink'
    }],
    paperLevelData: String,
    status: String,
    ordersToPrint:  [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
});

const Device = mongoose.model('device', deviceSchema);

module.exports = Device;