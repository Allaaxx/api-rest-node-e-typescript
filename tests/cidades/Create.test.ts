import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";



describe("Cidades - Create", () => {
  it("Deve criar um registro com nome válido", async () => {
    const res = await testServer.post("/cidades").send({ nome: "Rio de Janeiro" });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });

  it("Não deve criar um registro com nome muito curto", async () => {
    const res = await testServer.post("/cidades").send({ nome: "RJ" });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("Não deve criar um registro sem o campo nome", async () => {
    const res = await testServer.post("/cidades").send({});

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body.nome");
  });

  it("Não deve aceitar campos não definidos no schema", async () => {
    const res = await testServer.post("/cidades").send({ nome: "Curitiba", estado: "PR" });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.body");
  });
});