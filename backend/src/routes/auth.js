const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

router.post("/cadastro", async (req, res) => {
    const { nome, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

    db.query(sql, [nome, email, senhaHash], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ mensagem: "Erro ao cadastrar" });
        }

        res.status(201).json({ mensagem: "Usuário cadastrado!" });
    });
});


router.post("/login", (req, res) => {
    const { email, senha } = req.body;
    console.log(email, senha);
    

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [email], async (err, resultado) => {
        if (err) {
            console.log("ERRO NO LOGIN:", err);
            return res.status(500).json({ mensagem: "Erro no servidor" });
        }

        if (resultado.length === 0) {
            return res.status(401).json({ mensagem: "Email ou senha incorretos" });
        }

        const usuario = resultado[0]; 
        console.log(usuario.senha, senha);
        

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: "Email ou senha incorretos" });
        }

        res.json({
            mensagem: "Login realizado!",
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    });
});
module.exports = router;