
const historicoMensagens = [
  {
    id: 1,
    usuario: "Ana",
    texto: "Bom dia, turma!"
  },
  {
    id: 2,
    usuario: "Pedro",
    texto: "Servidor online!"
  }
];

// Serialização: objeto para texto JSON
const conteudoSalvar = JSON.stringify(
  historicoMensagens,
  null,
  2
);

console.log("Conteúdo JSON:");
console.log(conteudoSalvar);

console.log("Tipo da variável:", typeof conteudoSalvar);

// Desserialização: texto JSON para objeto
const jsonValido = '[{"id": 10, "usuario": "Lucas", "texto": "Teste"}]';

const mensagensRecuperadas = JSON.parse(jsonValido);

console.log("Mensagem recuperada:", mensagensRecuperadas[0].texto);

// Testando JSON quebrado
const jsonQuebrado = '[{ id: 10, quebrado: sim ';

try {
  JSON.parse(jsonQuebrado);
} catch (erro) {
  console.error(
    "Alerta: JSON corrompido! Detalhes:",
    erro.message
  );
}
