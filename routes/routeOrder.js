const express = require("express")
const routerOrder = express.Router()
const orderController = require("../controllers/orderController")


routerOrder.get("/Order",orderController.getOrder)

module.exports = routerOrder