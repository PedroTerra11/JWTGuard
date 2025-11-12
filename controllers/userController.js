const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ username: user.username }, process.env.JWT_CODE, {
    expiresIn: "1h",
  });
};

const cadastrar = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuarioExistente = await User.findOne({ username });

    if (usuarioExistente) {
      return res.status(400).json({ message: "Esse usuário já existe." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar o usuário.", error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Usuário ou senha inválidos." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Usuário ou senha inválidos." });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro no login.", error });
  }
};

const protected = (req, res) => {
  res.json({
    message: `Acesso autorizado. Bem-vindo(a), ${req.user.username}!`,
  });
};

module.exports = { cadastrar, login, protected };
