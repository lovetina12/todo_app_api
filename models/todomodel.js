const mongoose = require('mongoose');

const todoShema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default:false,
        Required: true
    },
    endDate:{
        type: String,
        
        required: true 
    }
});

module.exports = mongoose.model('todoModel',todoShema);
