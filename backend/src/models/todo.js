import mongoose from 'mongoose';

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

export default mongoose.model('Todo', todoSchema)