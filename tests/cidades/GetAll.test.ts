import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetAll", () => {
  it("Deve retornar erro 500 pois não está implementado", async () => {
    const res = await testServer.get("/cidades");

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.text).toBe("Não Implementado!");
  });

  it("Deve aceitar uma consulta válida", async () => {
    const res = await testServer.get("/cidades?page=1&limit=10&filter=teste");

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.text).toBe("Não Implementado!");
  });

  it("Não deve aceitar valores inválidos para page e limit", async () => {
    const res = await testServer.get("/cidades?page=-1&limit=0");

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.query.page");
    expect(res.body).toHaveProperty("errors.query.limit");
  });

  it("Deve aceitar requisição sem parâmetros", async () => {
    const res = await testServer.get("/cidades");

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.text).toBe("Não Implementado!");
  });
});