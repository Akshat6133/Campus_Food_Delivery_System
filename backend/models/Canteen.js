const mongoose = require('mongoose');
const { Schema } = mongoose;

// This contains the Schema of the database of Shops_Adding

const CanteenSchema = new Schema({
    shopname:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
}, { collection: 'Canteen' });

module.exports = mongoose.model('Canteen',CanteenSchema)