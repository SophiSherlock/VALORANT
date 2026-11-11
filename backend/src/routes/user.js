// backend/src/routes/user.js
const express = require("express");
const db = require("../db");

const router = express.Router();

// 1. Rota para obter dados do utilizador (incluindo o rank salvo)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, nome, email, rank_nome, rank_icone FROM usuarios WHERE id = ?";

  db.query(sql, [id], (err, resultado) => {
    if (err) {
      console.log("ERRO AO BUSCAR UTILIZADOR:", err);
      return res.status(500).json({ mensagem: "Erro no servidor" });
    }

    if (resultado.length === 0) {
      return res.status(404).json({ mensagem: "Utilizador não encontrado" });
    }

    const usuario = resultado[0];

    res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      rank: usuario.rank_nome
        ? {
            tierName: usuario.rank_nome,
            iconUrl: usuario.rank_icone,
          }
        : null,
    });
  });
});

// 2. Rota para atualizar o rank do utilizador
router.put("/:id/rank", (req, res) => {
  const { id } = req.params;
  const { rank } = req.body;

  if (!rank || !rank.tierName) {
    return res.status(400).json({ mensagem: "Dados do rank são obrigatórios" });
  }

  const sql = "UPDATE usuarios SET rank_nome = ?, rank_icone = ? WHERE id = ?";

  db.query(sql, [rank.tierName, rank.iconUrl, id], (err, resultado) => {
    if (err) {
      console.log("ERRO AO ATUALIZAR RANK:", err);
      return res.status(500).json({ mensagem: "Erro ao atualizar rank" });
    }

    res.json({ mensagem: "Rank atualizado com sucesso!" });
  });
});

module.exports = router;