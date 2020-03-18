const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postCode: String,
    country: String,
    password: String,
    token: String,
    accountstatus: String,
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    userOrders: [
        {
            type:Schema.Types.Array
        }
    ],
    accountType:String
});

const User = mongoose.model('user', userSchema);

module.exports = User;