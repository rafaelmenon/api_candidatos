const mongoose = require("mongoose");
const Users = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.authenticate = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).json({ message: "Usuário e senha são obrigatórios" });
    }

    const user = await Users.findOne({ username });

    if (!user.status) {
      res.status(400).json({ message: "Usuário bloqueado" });
    }

    if (user && user.status && bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "Credenciais inválidas" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};
