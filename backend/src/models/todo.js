const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'User',
    //     require:true
    // }
},{
    timestamps:true
})

module.exports = mongoose.model('Todo', todoSchema)