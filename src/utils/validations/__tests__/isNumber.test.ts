import { isNumber } from "../isNumber";

describe("Função para verificar se o valor é um número", () => {
  it("Valor é um número", () => {
    const valor = 1;
    expect(isNumber({ value: valor })).toBeUndefined();
  });
  it("Valor não é um número", () => {
    const valor = "1";
    expect(() => isNumber({ value: valor })).toThrow();
  });
});
