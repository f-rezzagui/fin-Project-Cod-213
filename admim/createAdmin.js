const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Regin = require ("../modeles/ReginModele")

require("dotenv").config();

async function createAdmin() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connecté");

   
    const existingAdmin = await Regin.findOne({
      email: "admin@gmail.com"
    });

    if (existingAdmin) {
      console.log("Cet administrateur existe déjà !");
      process.exit();
    }

    
    const password = await bcrypt.hash("Admin123!", 10);

  
    const admin = new Regin({
      name: "Admin",
      firstname: "Administrateur",
      email: "admin@gmail.com",
      passeword:123456,
      role: "admin"
    });

    await admin.save();

    console.log(" Administrateur créé avec succès !");
    console.log("Email : admin@gmail.com");

    process.exit();

  } catch (error) {
    console.error(" Erreur :", error);
    process.exit(1);
  }
}

createAdmin();