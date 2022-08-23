import { isString } from "../isString";

describe("Função para verificar se o valor é uma string", () => {
  it("É uma string", () => {
    const valor = "1";
    expect(isString({ value: valor })).toBeUndefined();
  });
  it("Não é uma string", () => {
    const valor = 1;
    expect(() => isString({ value: valor })).toThrow();
  });
  it("Não é uma string e contém um nome específico", () => {
    const valor = 1;
    const nome = "valor";
    expect(() => isString({ value: valor, nome })).toThrow();
  });
  it("Valor é vazio", () => {
    const valor = undefined;
    expect(isString({ value: valor })).toBeUndefined();
  });
  it("Valor é vazio e contém um nome específico", () => {
    const valor = undefined;
    const nome = "valor";
    expect(isString({ value: valor, nome })).toBeUndefined();
  });
  it("Valor é uma string muito grande", () => {
    const valor = "1".repeat(501);
    expect(() => isString({ value: valor })).toThrow();
  });
  it("Valor é uma string muito grande e contém um nome específico", () => {
    const valor = "1".repeat(501);
    const nome = "valor";
    expect(() => isString({ value: valor, nome })).toThrow();
  });
});
