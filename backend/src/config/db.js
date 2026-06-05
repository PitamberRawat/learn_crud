const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://Pitamber:pitamber@cluster0.lotqq4g.mongodb.net/todo-app?appName=Cluster0"

const connectDB= async ()=>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;