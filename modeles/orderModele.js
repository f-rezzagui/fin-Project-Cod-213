const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
        achatID :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Achat",
            required:true
        },
        ProductID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        status:{
            type:String,
            enum:["pemding","delivered","cancelled"],
            default:"pemding"
        }
})
module.exports = mongoose.model("Order", orderSchema)