const express = require("express");
const cors = require("cors");

require("./db");

const authRoutes = require("./routes/auth");

const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/api/usuarios", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend funcionando!");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});