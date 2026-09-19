const jwt = require("jsonwebtoken");

const jwt_secret = "1234567";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("Authorization reçu :", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "Token manquant"
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Format du token invalide"
      });
    }

    const token = parts[1];

    console.log("Token reçu :", token);

    const verify = jwt.verify(token, jwt_secret);

    console.log("Utilisateur JWT :", verify);

    req.user = verify;

    next();

  } catch (error) {

    console.error("Erreur JWT :", error.message);

    return res.status(401).json({
      message: error.message
    });
  }
};

module.exports = authMiddleware;