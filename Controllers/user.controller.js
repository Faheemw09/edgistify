const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModels = require("../models/userModels");

exports.Signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }
    const emailExits = await userModels.findOne({ email });
    if (emailExits) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 5);
    const createUser = new userModels({
      name,
      email,
      password: hashedpassword,
    });
    await createUser.save();
    res.status(200).json({
      message: "signup Sucessfully",
      data: createUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.userSignin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email Not Found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { autherID: user._id, email: user.email },
      "gadhani",
      { expiresIn: "7d" }
    );

    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({
      message: "Signin successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        lastLogin: user.lastLogin,
      },
    });
  } catch (err) {
    console.error("Error in userSignin:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModels.find({});
    res.status(200).send({
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
