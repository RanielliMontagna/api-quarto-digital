import { isInteger } from "../isInteger";

describe("Função para verificar se o valor é um número inteiro", () => {
  it("Valor é um número", () => {
    const valor = 1;
    expect(isInteger({ value: valor })).toBeUndefined();
  });
  it("Valor não é um número", () => {
    const valor = "1";
    expect(() => isInteger({ value: valor })).toThrow();
  });
  it("Valor não é um número e tem um nome específico", () => {
    const valor = "1";
    const nome = "valor";
    expect(() => isInteger({ value: valor, nome })).toThrow();
  });
});
