// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Exemplo de dados
let pontos = [];
let alertas = [];
let rotas = [];
let destino = null;

// GET todos os pontos
app.get('/pontos', (req, res) => {
  res.json(pontos);
});

// POST novo ponto
app.post('/pontos', (req, res) => {
  const novoPonto = req.body;
  pontos.push(novoPonto);
  res.status(201).json(novoPonto);
});

// GET alertas
app.get('/alertas', (req, res) => {
  res.json(alertas);
});

// POST alerta
app.post('/alertas', (req, res) => {
  const novoAlerta = req.body;
  alertas.push(novoAlerta);
  res.status(201).json(novoAlerta);
});

// GET rotas
app.get('/rotas', (req, res) => {
  res.json(rotas);
});

// POST nova rota
app.post('/rotas', (req, res) => {
  const novaRota = req.body;
  rotas.push(novaRota);
  res.status(201).json(novaRota);
});

// POST destino
app.post('/destino', (req, res) => {
  destino = req.body;
  res.status(200).json({ mensagem: 'Destino definido com sucesso!', destino });
});

// GET destino
app.get('/destino', (req, res) => {
  res.json(destino);
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});
