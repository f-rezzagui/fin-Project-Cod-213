const mongoose = require("mongoose");
const achatShema = new mongoose.Schema({
  ProdactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Regin",
    required: false,
  },
  nameAchat:{
    type: String,
    required: true,
    },
    address:{
    type: String,
    required: true,
    },
  
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  phone : {
    type: Number,
    required: true,
    min: 1,
  },
  pointure: {
    type: Number,
    required: true,
  },
   totalPrice: {
    type: Number,
    required: false,
  },
});
module.exports = mongoose.model("Achat", achatShema);
