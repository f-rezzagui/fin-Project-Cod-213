const express = require("express")
const routeRegin = express.Router()
const ReginController = require ("../controllers/ReginController")
const LigenController = require("../controllers/LigenController")
const authMiddleware = require("../middlewares/auth.middleware")


routeRegin.post("/Regin",ReginController.createRegin)
routeRegin.post("/Ligen", LigenController.loginUser)
routeRegin.get("/profile",authMiddleware,ReginController.getProfile)
routeRegin.patch(
  "/profile",
  authMiddleware,
  ReginController.upload.single("image"),
  ReginController.updateProfile
);
module.exports = routeRegin;