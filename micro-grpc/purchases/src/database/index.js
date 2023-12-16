const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/micro');

// Adicionar um ouvinte de eventos para o evento 'open'
mongoose.connection.on('open', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');

  // Agora você pode começar a interagir com o MongoDB aqui
  // Exemplo: Definir um modelo Mongoose e executar consultas
});

// Adicionar um ouvinte de eventos para o evento 'error'
mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

// Adicionar um ouvinte de eventos para o evento 'disconnected'
mongoose.connection.on('disconnected', () => {
  console.log('Conexão com o MongoDB foi desconectada');
});

// Adicionar um ouvinte de eventos para o evento 'close'
mongoose.connection.on('close', () => {
  console.log('Conexão com o MongoDB foi fechada');
});

// Adicionar um ouvinte de eventos para o evento 'SIGINT'
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Conexão com o MongoDB foi encerrada devido a um sinal SIGINT');
    process.exit(0);
  });
});
