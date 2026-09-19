const Prodact = require ("../modeles/prodactModele")
const Achat = require ("../modeles/achatModele")



exports.getAchats = async (req, res) => {
  try {
    const achats = await Achat.find().populate("ProdactId");

    res.status(200).json(achats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.addAchat = async (req,res)=>{
    const {ReginId,ProdactId, quantity, pointure} = req.body
    const prodact = await Prodact.findById(ProdactId)
    console.log(ProdactId)
    if(!prodact){
        return res.json({message:"prodact not found"})
        
    }
    if(prodact.AvilableNumber < quantity){
        return res.json({message:"not enough AvilableNumber"})
    }
    prodact.AvilableNumber -= quantity;
    await prodact.save()
    const achat = new Achat({
        ReginId,ProdactId, quantity
    })
    await achat.save()
    res.json(achat)
}

exports.createAchat = async (req, res) => {
  try {
    const {
      productId,
      nameAchat,
      address,
      phone,
      quantity,
      pointure,
    } = req.body;

    const product = await Prodact.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Produit introuvable",
      });
    }

  
    const totalPrice = product.price * quantity;

  
    const achat = new Achat({
      ProdactId: product._id,
      quantity,
      nameAchat,
      address,
      phone,
      pointure
    });

    await achat.save();

    res.status(201).json({
      message: "Achat effectué avec succès",
      achat,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteAchat = async (req, res) => {
  try {
    const achat = await Achat.findByIdAndDelete(req.params.id);

    if (!achat) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyAchats = async (req, res) => {
  try {
    const achats = await Achat.find({
      userId: req.user.id,
    }).populate("ProdactId");

    res.status(200).json(achats);

  } catch (error) {
    console.error("Erreur historique :", error);

    res.status(500).json({
      message: "Erreur lors de récupération de l'historique",
    });
  }
};