const mongoose = require('mongoose');
const { Schema } = mongoose;

// This contains the Schema of the database of Restaurant_Admin.

const AdminSchema = new Schema({
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
        required: true
    },
    shopname:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('admin',AdminSchema)