const express =require ("express")
const route = express.Router()
const RouteRegin = require ("./RouteRegin")
const routeProdact = require("./routeProdact")
const routeAchat = require("./routeAchat")
route.use(routeAchat )
route.use(routeProdact)
route.use(RouteRegin)
module.exports = route