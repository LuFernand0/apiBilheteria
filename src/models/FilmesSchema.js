const mongoose = require('mongoose');

const FilmeSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    categoria: { type: String, required: true },
    foto_url: { type: String, required: true },
    descricao: { type: String, required: true },
    faixa_etaria: { type: String, required: true },
  });

  module.exports = mongoose.model('Filme', FilmeSchemaSchema);