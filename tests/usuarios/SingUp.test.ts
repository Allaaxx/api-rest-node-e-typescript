import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuário - SingUp', () => {
  it('Erro ao cadastrar usuário com email duplicado', async () => {
    const res = await testServer
    .post('/cadastrar')
    .send({
      senha: '123456',
      nome: 'Allan Oliveira',
      email: 'allanoliveira@gmail.com',
    });
  expect(res.status).toEqual(StatusCodes.CREATED);
  expect(typeof res.body).toEqual('number');

    const res2 = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Eliane Oliveira',
        email: 'allanoliveira@gmail.com',
      });
    expect(res2.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');
  });


  it('Cadastrar usuário com sucesso', async () => {
    const res = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Allan Oliveira',
        email: 'allanoliveiras@gmail.com',
      });
    expect(res.status).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual('number');
  });

  it('Erro ao cadastrar usuário com email inválido', async () => {
    const res = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Allan Oliveira',
        email: 'emailinvalido',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao cadastrar usuário com senha muito curta', async () => {
    const res = await testServer
      .post('/cadastrar')
      .send({
        senha: '123',
        nome: 'Allan Oliveira',
        email: 'allanoliveira@gmail.com',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao cadastrar usuário com nome vazio', async () => {
    const res = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: '',
        email: 'allanoliveira@gmail.com',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao cadastrar usuário com email vazio', async () => {
    const res = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Allan Oliveira',
        email: '',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao cadastrar usuário com senha vazia', async () => {
    const res = await testServer
      .post('/cadastrar')
      .send({
        senha: '',
        nome: 'Allan Oliveira',
        email: 'allanoliveira@gmail.com',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao cadastrar usuário sem nome', async () => {
    const res = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        email: 'allanoliveira@gmail.com',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao cadastrar usuário sem email', async () => {
    const res = await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Allan Oliveira',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao cadastrar usuário sem senha', async () => {
    const res = await testServer
      .post('/cadastrar')
      .send({
        nome: 'Allan Oliveira',
        email: 'allanoliveira@gmail.com',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao cadastrar usuário com email e senha muito curtos', async () => {
    const res = await testServer
      .post('/cadastrar')
      .send({
        senha: '123',
        nome: 'Allan Oliveira',
        email: 'a@b.c',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao cadastrar usuário com todos os campos vazios', async () => {
    const res = await testServer
      .post('/cadastrar')
      .send({
        senha: '',
        nome: '',
        email: '',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });
});