const User = require('../models/User');
const bcrypt = require('bycrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ username: user.username }, process.env.JWT_CODE, { expiresIn: '1h'});
};

const cadastrar = async (req, res) => {
    const { username, password } = req.body;
    const usuarioexistente = await User.findOne({ username });
    if(usuarioexistente){
        return res.status.json({ message: 'Esse usuário já existe.'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const User = new User({ username, password: hashedPassword})
    await user.save();

    res.status(201).json({ message: 'Usuário criado com sucesso'})
    
}