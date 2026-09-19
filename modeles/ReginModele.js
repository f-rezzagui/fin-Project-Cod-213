const mongoose = require("mongoose");
const reginShema = new mongoose.Schema({
    name: {type: String,
        required:true
    },
    firstname: {type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
       match: [/^\S+@\S+\.\S+$/,
  "Veuillez saisir une adresse email valide"
]
    },
    passeword:{
        type : String,
        required:true,
        minlength:8,
//         validate: {
//             validator: function(value){
//             return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@!?&$#]).+$/.test(value)
//         },

//         message :"passeword must contain uppercase, lowercase ,number, and special character @!?&$#",
// }
    },

    image: {
  type: String,
  default: ""
},
 role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
    
})
module.exports = mongoose.model("Regin", reginShema)