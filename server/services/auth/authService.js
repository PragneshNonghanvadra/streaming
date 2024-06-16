const User = require("../../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_EXPIRE_TIME } = require("./constants/token");

function _getUserObjectWhichCanBeSentToClient(userModel, token) {
  const user = userModel.toObject();
  user.token = token;
  user.password = undefined;

  return user;
}

function _getTokenResponseOption() {
  return {
    expires: new Date(Date.now() + TOKEN_EXPIRE_TIME * 1000),
    httpOnly: true, // It will make cookie not accessible on client side
  };
}

async function register(req, res, next) {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Username or Password not present" });
  }

  // this validation should also be on client side
  if (password.length < 8) {
    return res.status(400).json({ message: "Password less than 8 characters" });
  }

  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(200).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(401).json({
      message: "Failed to register",
      error: err.message,
    });
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  // Check if username and password is provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email or Password not present" });
  }

  try {
    let user = await User.findOne({ email });

    // check if user is registered or not?
    if (!user) {
      res.status(401).json({ message: "Email is not registered" });
    }

    // verify password and generate JWT token
    const isCorrectPassword = await bcrypt.compare(password, user["password"]);

    if (!isCorrectPassword) {
      res.status(403).json({ message: "Invalid Credentials" });
    }

    // generate JWT token
    const tokenGenerationPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(tokenGenerationPayload, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRE_TIME,
    });

    return res
      .cookie("auth", token, _getTokenResponseOption())
      .status(200)
      .json({
        token,
        user: _getUserObjectWhichCanBeSentToClient(user, token),
        message: "Logged in successfully",
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
}

module.exports = { register, login };
