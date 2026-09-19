const express = require("express");
const routerProdact = express.Router();
const prodactController = require("../controllers/prodactController");

const {authMiddleware,adminMiddleware} = require("../middlewares/adminMiddleware");

const upload = require("../middlewares/upload"); 


routerProdact.get("/prodact",prodactController.getProducts);
routerProdact.get("/prodact/:id",prodactController.getProductById);
routerProdact.post("/prodact",authMiddleware,adminMiddleware,prodactController.addProduct);
routerProdact.patch("/prodact/:id",authMiddleware,adminMiddleware,upload.single("image"), prodactController.updateProdact);
routerProdact.delete( "/prodact/:id",authMiddleware,adminMiddleware,prodactController.deleteprodact);
module.exports = routerProdact;