import express from 'express';

const server = express();

server.get('/', (_, res) => {
    res.send('Servidor rodando com SUCESSO!');
});

export { server };
