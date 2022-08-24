import { isCpf } from "../isCpf";

describe("isCpf - Função para verificar se o valor é um CPF válido", () => {
  it("Deve retornar undefined se o CPF for válido", () => {
    expect(isCpf("04097105043")).toBeUndefined();
    expect(isCpf("040.971.050-43")).toBeUndefined();
  });

  it("Deve retornar undefined se o valor for vazio", () => {
    expect(isCpf("")).toBeUndefined();
  });

  it("Deve retornar um erro se o CPF for inválido", () => {
    expect(() => isCpf("04097105044")).toThrow();
    expect(() => isCpf("040.971.050-44")).toThrow();
  });

  it("Deve retornar um erro se todos os dígitos forem iguais", () => {
    expect(() => isCpf("11111111111")).toThrow();
    expect(() => isCpf("111.111.111-11")).toThrow();
  });

  it("Deve retornar um erro se o CPF não tíver 11 dígitos", () => {
    expect(() => isCpf("040971050431")).toThrow();
    expect(() => isCpf("040.971.050-431")).toThrow();
  });

  it("Deve retornar um erro se o segundo dígito verificador for inválido", () => {
    expect(() => isCpf("12345678912")).toThrow();
    expect(() => isCpf("123.456.789-12")).toThrow();
  });
});
