const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).json({ message: "Token é obrigatório" });
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
};

module.exports = verifyToken;
