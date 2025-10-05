require("dotenv").config();
const mongoose = require('mongoose');
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MongoDbUrl,{
        });
        console.log("Mongodb Connected Successfully");
        
    } catch (error) {
        console.log("mongodb connection error");
        process.exit(1);
    }
}

module.exports = connectDB;