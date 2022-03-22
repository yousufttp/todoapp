const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id : {
        type: Number
    },
    task : {
        type: String
    },
    status : {
        type: Boolean
    }
})

module.exports = mongoose.model("task", taskSchema);

