const Prodact = require ("../modeles/prodactModele")
const multer = require("multer");
const fs = require("fs");
const {CloudinaryStorage}= require("multer-storage-cloudinary")
const cloudinary = require("../configs/cloudinary")


exports.getProducts = async (req, res) => {
  try {
    const { search, category, price, genre } = req.query;

    const filter = {};

    // Recherche dans nom, catégorie ou genre
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          genre: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Filtre catégorie
    if (category) {
      filter.category = {
        $regex: `^${category}$`,
        $options: "i",
      };
    }

    // Filtre genre
    if (genre) {
      filter.genre = {
        $regex: `^${genre}$`,
        $options: "i",
      };
    }

    // Prix minimum
    if (price) {
      filter.price = {
        $gte: Number(price),
      };
    }

    const products = await Prodact.find(filter);

    res.status(200).json(products);

  } catch (error) {
    console.error("Erreur getProducts :", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateProdact = async (req, res) => {
  try {


    const {
      name,
      category,
      prix,
      price,
      description
    } = req.body || {};

    if (price !== undefined && price !== "") {
      if (isNaN(Number(price))) {
        return res.status(400).json({
          message: "Le prix numérique doit être un nombre"
        });
      }
    }

    const updateData = {};

    if (name !== undefined && name !== "") {
      updateData.name = name;
    }

    if (category !== undefined && category !== "") {
      updateData.category = category;
    }

    if (prix !== undefined && prix !== "") {
      updateData.prix = prix;
    }

    if (price !== undefined && price !== "") {
      updateData.price = Number(price);
    }

    if (description !== undefined && description !== "") {
      updateData.description = description;
    }

    
    if (req.file) {
      updateData.image = req.file.path;
    }

    console.log("DONNÉES À MODIFIER :", updateData);

    // Vérifier qu'il y a des données à modifier
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "Aucune donnée à modifier"
      });
    }

    const product = await Prodact.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateData
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable"
      });
    }

    console.log("PRODUIT MODIFIÉ :", product);

    return res.status(200).json({
      message: "Produit modifié avec succès",
      product
    });

  } catch (error) {

    console.error("ERREUR UPDATE PRODUIT :", error);

    return res.status(500).json({
      message: "Erreur lors de la modification du produit",
      error: error.message
    });
  }
};



exports.deleteprodact = async (req,res) =>{try{
    const prodact = await Prodact.findByIdAndDelete(req.params.id)
    if (!prodact) { 
        return res.status(400).json({message:"prodact not found"})
    }
    res.json({message:" prodact delete"})
}catch(error){
    return res.status(400).json({message:error.message})
}
    
    
}




if (!fs.existsSync("uploads/")) {
    fs.mkdirSync("uploads/");
}


const storage = new CloudinaryStorage ({
    cloudinary: cloudinary,
    params:{
        folder:"prodact",
        allowed_formats:["jpg","png","jpeg","webp"]
    }
})



const upload = multer({ storage });

exports.addProduct = (req, res) => {
    
    upload.single("image")(req, res, async (error) => { 
        if (error) {
            console.error("Erreur de téléchargement :", error);
            return res.status(400).json({ message: error.message });
        }

       
        if (!req.file) {
            return res.status(400).json({ message: "Veuillez fournir une image valide." });
        }

        try {
          
            const product = new Prodact({ 
                name: req.body.name,
                prix: req.body.prix,
                category: req.body.category,
                price: req.body.price,
                image: req.file.path,
                genre: req.body.genre,
                description: req.body.description || ""
            });

            await product.save(); 

            
            return res.status(201).json(product); 

        } catch (dbError) {
            console.error("Erreur base de données :", dbError);
            return res.status(500).json({ message: "Erreur lors de la sauvegarde du produit." });
        }
    });
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Prodact.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};