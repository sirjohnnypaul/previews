const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    fileName: String,
    status:String,
    dateCreated: String,
    deliveryDate: String,
    delivery: String,
    price: String,
    type: String,
    description: String,
    pagesToPrint: Number,
    orderFiles: [
        {
            type:Object
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    veryficationId: String
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;