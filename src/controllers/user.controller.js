const repository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const validation = require("../validations/users.validations");

exports.getUsers = async (req, res) => {
  try {
    const data = await repository.getUsers();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ message: "Falha ao carregar os usuários" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const data = await repository.getUser(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ message: "Falha ao carregar o usuário." });
  }
};

exports.createUser = async (req, res) => {
  try {
    await validation.usersSchema.validate(req.body);
    encryptedPassword = await bcrypt.hash(req.body.password, 10);

    await repository.createUser({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: encryptedPassword,
    });

    res.status(200).json({ message: "Usuário criado com sucesso" });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.updateUser = async (req, res) => {
  try {
    await repository.updateUser(req.params.id, req.body);

    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await repository.deleteUSer(req.params.id);
    res.status(200).json({ message: "Usuário excluido com sucesso" });
  } catch (e) {
    res.status(500).send(e);
  }
};
