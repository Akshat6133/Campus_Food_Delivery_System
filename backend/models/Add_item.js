const mongoose = require('mongoose');
const { Schema } = mongoose;

// This contains the Schema of the database of User.

const Add_milkshakeSchema = new Schema({
    shopname:{
        type: String,
        required: true
    },
    categoryname:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    options:{
        type: Array,
        required: true
    }
}, { collection: 'add_items' });

module.exports = mongoose.model('Add_item',Add_milkshakeSchema)