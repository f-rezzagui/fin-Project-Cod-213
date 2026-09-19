const mongoose = require("mongoose");
const productShema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    },
  prix:{
          type:String,
          required: true
    },
  category:{ 
    type: String,
    required: true 
    },
  price:{ type: Number, 
    default: 1,
    min: 0
    },
  image:{
    type: String,
    required: true,
    },
  description: { 
    type: String 
    }
    ,
      genre:{
            type:String,
            enum:["femme","homme","enfants"],
             required: true,
        }
});
module.exports = mongoose.model("Product", productShema);
