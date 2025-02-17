import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuário - SingIn', () => {
  beforeAll(async () => {
    await testServer
      .post('/cadastrar')
      .send({
        senha: '123456',
        nome: 'Allan Oliveira',
        email: 'allanoliveira@gmail.com',
      });
  });

  it('Login com sucesso', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        email: 'allanoliveira@gmail.com',
        senha: '123456',
      });
    expect(res.status).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('Erro ao tentar login com email inválido', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        email: 'emailinvalido',
        senha: '123456',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao tentar login com senha incorreta', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        email: 'allanoliveira@gmail.com',
        senha: 'senhaerrada',
      });
    expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao tentar login com email não cadastrado', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        email: 'naocadastrado@gmail.com',
        senha: '123456',
      });
    expect(res.status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao tentar login sem email', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        senha: '123456',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao tentar login sem senha', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        email: 'allanoliveira@gmail.com',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao tentar login com email vazio', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        email: '',
        senha: '123456',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao tentar login com senha vazia', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        email: 'allanoliveira@gmail.com',
        senha: '',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao tentar login com email e senha vazios', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        email: '',
        senha: '',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao tentar login com email muito curto', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        email: 'a@.c',
        senha: '123456',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao tentar login com senha muito curta', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        email: 'allanoliveira@gmail.com',
        senha: '123',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  it('Erro ao tentar login com email e senha muito curtos', async () => {
    const res = await testServer
      .post('/entrar')
      .send({
        email: 'a@b.c',
        senha: '123',
      });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors');
  });

  
});
