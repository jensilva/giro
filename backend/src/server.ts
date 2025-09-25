import app from './app.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('Servidor rodando na porta 3000');
});

server.on('error', (error) => {
  console.error('Erro ao iniciar o servidor:', error);
});
