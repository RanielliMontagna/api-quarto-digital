import { max99999, max999999, min0 } from "../numbersLength";

describe("max999999 - Função para verificar se o valor é no máximo 999999", () => {
  it("É no máximo 999999", () => {
    const valor = 999999;
    expect(max999999({ value: valor })).toBeUndefined();
  });
  it("É no máximo 999999 e contém um nome específico", () => {
    const valor = 999999;
    const nome = "valor";
    expect(max999999({ value: valor, nome })).toBeUndefined();
  });
  it("É maior que 999999", () => {
    const valor = 1000000;
    expect(() => max999999({ value: valor })).toThrow();
  });
  it("É maior que 999999 e contém um nome específico", () => {
    const valor = 1000000;
    const nome = "valor";
    expect(() => max999999({ value: valor, nome })).toThrow();
  });
});

describe("max99999 - Função para verificar se o valor é no máximo 99999", () => {
  it("É no máximo 99999", () => {
    const valor = 99999;
    expect(max99999({ value: valor })).toBeUndefined();
  });
  it("É no máximo 99999 e contém um nome específico", () => {
    const valor = 99999;
    const nome = "valor";
    expect(max99999({ value: valor, nome })).toBeUndefined();
  });
  it("É maior que 99999", () => {
    const valor = 100000;
    expect(() => max99999({ value: valor })).toThrow();
  });
  it("É maior que 99999 e contém um nome específico", () => {
    const valor = 100000;
    const nome = "valor";
    expect(() => max99999({ value: valor, nome })).toThrow();
  });
});

describe("min0 - Função para verificar se o valor é no mínimo 0", () => {
  it("É no mínimo 0", () => {
    const valor = 0;
    expect(min0({ value: valor })).toBeUndefined();
  });
  it("É no mínimo 0 e contém um nome específico", () => {
    const valor = 0;
    const nome = "valor";
    expect(min0({ value: valor, nome })).toBeUndefined();
  });
  it("É menor que 0", () => {
    const valor = -1;
    expect(() => min0({ value: valor })).toThrow();
  });
  it("É menor que 0 e contém um nome específico", () => {
    const valor = -1;
    const nome = "valor";
    expect(() => min0({ value: valor, nome })).toThrow();
  });
});
