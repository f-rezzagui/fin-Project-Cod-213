const Regin = require ("../modeles/ReginModele")
const bcrypt = require ("bcrypt")
const {CloudinaryStorage}= require("multer-storage-cloudinary")
const cloudinary = require("../configs/cloudinary")
const multer = require("multer");

exports.createRegin = async (req, res) => {
  try {
    const { name, firstname, email, passeword } = req.body;

    console.log(name, firstname, email, passeword);

    const exisRegin = await Regin.findOne({ email });

    if (exisRegin) {
      return res.status(400).json({
        message: "Cette adresse email est déjà utilisée."
      });
    }
    const hashpassword = await bcrypt.hash(passeword, 10);
    const user = new Regin({
      name,
      firstname,
      email,
      passeword: hashpassword
    });
    await user.save();
    return res.status(201).json({
      message: "Utilisateur créé avec succès.",
      user
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message
    });
  }
};









exports.getProfile = async (req, res) => {
  try {
    const user = await Regin.findById(req.user.id).select("-passeword");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};







const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Profile",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

const upload = multer({
  storage
});

exports.upload = upload;

exports.updateProfile = async (req, res) => {
  try {
    const { name, firstname, email } = req.body;

    const updateData = {
      name,
      firstname,
      email
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const user = await Regin.findByIdAndUpdate(
      req.user.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).select("-passeword");

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Erreur updateProfile :", error);

    res.status(500).json({
      message: "Erreur lors de la modification du profil"
    });
  }
};





async function createAdmin() {
  const password = await bcrypt.hash("Admin123!", 10);

  const admin = new Regin({
    name: "Admin",
    firstname: "Administrateur",
    email: "admin@gmail.com",
    passeword: password,
    role: "admin"
  });

  await admin.save();

  console.log("Administrateur créé !");
}

createAdmin();