const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    
    task:String,
    isDone:Boolean
});

const Todo =mongoose.model("todo",todoSchema);

module.exports = Todo;