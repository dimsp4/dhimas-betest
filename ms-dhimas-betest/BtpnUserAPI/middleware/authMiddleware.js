const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const token = authHeader.replace("Bearer ", "");
    try {
      if (token) {
        const key = "LOLOSBTPN";
        const decoded = jwt.verify(token, key);
        req.user = decoded;
        next();
      } else {
        return res
          .status(401)
          .json({ errorMsg: "Not authorized, token failed!" });
      }
    } catch (e) {
      return res
        .status(401)
        .json({ errorMsg: "Not authorized, token failed!" });
    }
  },
};
