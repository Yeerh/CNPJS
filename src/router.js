import { Router } from "express";
import Empresa from "./model/Empresa.js";
import { send } from "./socketService.js";
import jwt from "jsonwebtoken";
import isAuthenticated from "./middlewares/isAuthenticated.js";

const router = new Router();

// ROTA DE LOGIN (exemplo simples - ajuste com seu banco de usuários depois)
router.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  // Exemplo fixo pra teste rápido (depois troca por consulta no banco)
  if (usuario === "admin" && senha === "1234") {
    const token = jwt.sign(
      { id: 1, usuario: "admin" },
      process.env.JWT_SECRET || "segredo_super_secreto_2025",
      { expiresIn: "8h" }
    );
    return res.json({ token });
  }

  return res.status(401).json({ erro: "Usuário ou senha inválidos" });
});

// ROTA BUSCAR CNPJ (exatamente como você já tem)
router.post("/cnpj", isAuthenticated, async (req, res) => {
  console.log("Entrou na rota /cnpj");
  try {
    const { cnpj } = req.body;

    const empresaExistente = await Empresa.findOne({
      where: { cnpj: cnpj.replace(/\D/g, "") }
    });

    let mensagem = "";
    if (!empresaExistente) {
      mensagem = "Seu CNPJ está regularizado, não precisa recadastrar :)";
    }

    // ENVIA VIA SOCKET.IO PRA TODOS OS CLIENTES CONECTADOS
    send("cnpjStatus", {
      cnpj: cnpj.replace(/\D/g, ""),
      empresaExistente: !!empresaExistente
    });

    res.status(200).json({
      mensagem,
      empresaExistente: empresaExistente || null
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno", erro: err.message });
  }
});

export default router;