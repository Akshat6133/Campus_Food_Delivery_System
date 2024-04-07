const mongoose = require('mongoose');
const { Schema } = mongoose;

// This contains the Schema of the database of SuperAdmin.

const SuperAdminSchema = new Schema({
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
        type: String
    }
});

module.exports = mongoose.model('SuperAdmin',SuperAdminSchema);