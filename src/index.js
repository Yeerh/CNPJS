import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import router from "./router.js";
import { initSocketIO, send } from './socketService.js';
import sequelize from './database.js'; // seu arquivo de conexão com MySQL

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // seu front React
  credentials: true
}));
app.use(express.json());

// Rotas da API
app.use("/api", router);

// Teste de conexão com MySQL
sequelize.authenticate()
  .then(() => console.log("Conectado ao MySQL com sucesso!"))
  .catch(err => console.error("Erro ao conectar no MySQL:", err));

// Cria o servidor HTTP
const server = http.createServer(app);

// Inicializa Socket.IO
initSocketIO(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});