const express = require("express")
const routerAchat = express.Router()
const achatcontroller = require("../controllers/achatcontroller")
const authMiddleware = require("../middlewares/auth.middleware")

routerAchat.get("/achats" ,achatcontroller.getAchats)
routerAchat.post("/achat",achatcontroller.createAchat)
routerAchat.delete("/achats/:id",achatcontroller.deleteAchat)
routerAchat.get("/Myachat",authMiddleware,achatcontroller.getMyAchats)
module.exports = routerAchat
