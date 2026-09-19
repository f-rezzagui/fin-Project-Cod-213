const Regin = require("../modeles/ReginModele");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  const jwt_secret = "1234567";

  try {
    const { email, passeword } = req.body;

    const user = await Regin.findOne({ email });

    if (!user) {
      return res.json({ message: "user not found" });
    }

    const comparePassword = await bcrypt.compare(
      passeword,
      user.passeword
    );

    if (!comparePassword) {
      return res.json({ message: "invalid passeword" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      jwt_secret,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "login successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};