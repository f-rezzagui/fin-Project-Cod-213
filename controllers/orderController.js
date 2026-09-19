const Order = require ("../modeles/orderModele")
const Product = require("../modeles/prodactModele")




exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("achatID")
      .populate("productID");

    if (!order) {
      return res.status(404).json({
        message: "Commande introuvable",
      });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};