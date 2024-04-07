const mongoose = require('mongoose');
const { Schema } = mongoose;

// This contains the Schema of the database of User.

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contact:{
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    }
});

module.exports = mongoose.model('user',UserSchema)