const express = require("express");
const cors = require("cors");

require("./db");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend funcionando!");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});