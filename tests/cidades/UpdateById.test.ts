import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetById", () => {
  it("Deve retornar erro 500 pois não está implementado", async () => {
    const res = await testServer.get("/cidades/1");

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.text).toBe("Não Implementado!");
  });

  it("Não deve aceitar ID inválido (menor ou igual a 0)", async () => {
    const res = await testServer.get("/cidades/0");

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });

  it("Não deve aceitar ID inválido (não numérico)", async () => {
    const res = await testServer.get("/cidades/abc");

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });
});
