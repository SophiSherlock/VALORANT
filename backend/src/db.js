const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "meu_sistema"
});

db.connect((err) => {
    if (err) {
        console.log("ERRO NO LOGIN:", err);
        return res.status(500).json({ mensagem: "Erro no servidor" });
    }

    console.log("MySQL conectado!");
});

module.exports = db;