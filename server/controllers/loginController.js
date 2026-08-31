// loginController.js

const bcrypt = require("bcrypt");
const { User, validateLogin } = require("../models/userModel.js");

const loginController = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);

    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }

    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).send({
        message: "Invalid Email",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send({
        message: "Invalid Password",
      });
    }

    if (!user.verified) {
      return res.status(400).send({
        message: "User doesn't exist",
      });
    }

    const token = user.generateAuthToken();

    res.cookie("authToken", token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      message: "Login successful",
      status: 200,
    });

  } catch (error) {
    console.error("Error in loginController:", error);

    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = loginController;