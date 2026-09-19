const mongoose =require("mongoose")
const connectDB = async() => {
    try{
        await mongoose.connect("mongodb://localhost:27017/local")
        console.log("mongodb connected")
    }catch(err){
        console.log("db connection error", err)
    }
}
module.exports = connectDB