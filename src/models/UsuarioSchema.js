const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    nome: { type: String, required: true },
    idade: { type: Number, required: true },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);