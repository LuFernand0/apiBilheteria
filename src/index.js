const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Usuario = require("./models/UsuarioSchema");

const SALT_ROUNDS = 10;

async function criptografar(senha) {
    const hash = await bcrypt.hash(senha, SALT_ROUNDS);
    return hash;
}

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017")
    .then(() => console.log('Conectado!'))
    .catch(err => console.error('Erro de conexão:', err));

app.get('/listar', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({
            status: "sucess",
            data: usuarios
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put("/atualizar/:id", async (req, res) => {
    try {
        if (req.body.senha) {
            const senhaCriptografada = await criptografar(req.body.senha);
            req.body.senha = senhaCriptografada;
        }
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { 
            new: true 
        });
        res.status(200).json({
            status: "sucess",
            message: "Dados atualizados com sucesso",
            data: usuario
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete("/deletar/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "sucess",
            message: "Dados deletados",
            data: usuario
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/criar/', async (req, res) => {
    try {
        const senhaCriptografada = await criptografar(req.body.senha);
        const usuario = new Usuario({
            email: req.body.email,
            senha: senhaCriptografada,
            nome: req.body.nome,
            idade: req.body.idade
        });
        await usuario.save();
        res.status(200).json({
            status: "sucess",
            message: "Dados criados com sucesso",
            data: usuario
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log("Api está rodando na porta " + port);
});
