const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

//Create schema
const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Task = mongoose.model('task',TaskSchema);