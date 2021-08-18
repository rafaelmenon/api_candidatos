const express = require("express");
const mongoose = require("mongoose");
const Users = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("Usuário e senha são obrigatórios");
    }

    const user = await Users.findOne({ username });

    if (
      user &&
      user.status &&
      (await bcrypt.compare(password, user.password))
    ) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );

      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: "Crendenciais inválidas" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
