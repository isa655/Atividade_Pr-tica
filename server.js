
import express from "express";

import {
  lerMensagens,
  salvarMensagens
} from "./store.js";

const app = express();

const PORTA = 3000;

app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// Consultar mensagens
app.get("/mensagens", async (req, res) => {
  try {
    const mensagens = await lerMensagens();

    res.json(mensagens);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro na leitura"
    });
  }
});

// Salvar mensagem de exemplo
app.get("/exemplo-salvar", async (req, res) => {
  try {
    const lista = await lerMensagens();

    lista.push({
      id: Date.now(),
      usuario: "Aluno",
      texto: "Mensagem gravada no disco!"
    });

    await salvarMensagens(lista);

    res.json({
      gravado: true,
      total: lista.length
    });

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Falha ao gravar"
    });
  }
});

// Criar mensagem pelo método POST
app.post("/mensagens", async (req, res) => {
  try {
    const { usuario, texto } = req.body;

    if (
      typeof usuario !== "string" ||
      !usuario.trim() ||
      typeof texto !== "string" ||
      !texto.trim()
    ) {
      return res.status(400).json({
        erro: "Informe usuário e texto válidos"
      });
    }

    const mensagens = await lerMensagens();

    const novaMensagem = {
      id: Date.now(),
      usuario: usuario.trim(),
      texto: texto.trim()
    };

    mensagens.push(novaMensagem);

    await salvarMensagens(mensagens);

    res.status(201).json(novaMensagem);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao salvar mensagem"
    });
  }
});

// Iniciar servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
