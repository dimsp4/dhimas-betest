const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");

const secretKey = "LOLOSBTPN";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = new UserModel({ username, password });
    await newUser.save();

    res.json({ message: "Success Register" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Username or Password Wrong" });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });

    res.json({ message: "Success Login", token });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
};

module.exports = { register, login };
