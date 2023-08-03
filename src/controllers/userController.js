const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register User
// @route POST api/user/register
// @access public route
const createUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // All Fields are mandatory
    if (!name || !email || !mobile || !password) {
      throw new Error("All fields are Mandatory !!");
    }

    // Check User already Present or not
    const isUserValid = await User.findOne({ email });

    // If user already present
    if (isUserValid) {
      throw new Error("Email already present");
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

// @desc Login User
// @route POST api/user/login
// @access public route
const loginUser = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    if (!(email || mobile) || !password) {
      throw new Error("Invalid credentials provided.");
    }

    // Check user valid or not
    let user;
    if (email) {
      user = await User.findOne({ email }); // Here user provided email
    } else if (mobile) {
      user = await User.findOne({ mobile }); // Here user provided mobile no.
    }

    // Generate Token
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).send({ token: token });
    } else {
      throw new Error("Invalid credentials provided.");
    }
  } catch (error) {
    res.status(401).send({ message: "Authentication failed" });
  }
};

module.exports = { createUser, loginUser };
