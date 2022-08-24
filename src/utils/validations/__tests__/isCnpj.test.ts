import { isCnpj } from "../isCnpj";

describe("isCnpj - Função para verificar se o valor é um CNPJ válido", () => {
  it("Deve retornar undefined se o CNPJ for válido", () => {
    expect(isCnpj("07081093000175")).toBeUndefined();
    expect(isCnpj("07.081.093/0001-75")).toBeUndefined();
  });

  it("Deve retornar undefined se o valor for vazio", () => {
    expect(isCnpj("")).toBeUndefined();
  });

  it("Deve retornar um erro se o CNPJ for inválido", () => {
    expect(() => isCnpj("07081093000176")).toThrow();
    expect(() => isCnpj("07.081.093/0001-76")).toThrow();
  });

  it("Deve retornar um erro se todos os dígitos forem iguais", () => {
    expect(() => isCnpj("11111111111111")).toThrow();
    expect(() => isCnpj("11.111.111/1111-11")).toThrow();
  });

  it("Deve retornar um erro se o CNPJ não tíver 14 dígitos", () => {
    expect(() => isCnpj("070810930001751")).toThrow();
    expect(() => isCnpj("07.081.093/0001-751")).toThrow();
  });

  it("Deve retornar um erro se o segundo dígito verificador for inválido", () => {
    expect(() => isCnpj("07081092000174")).toThrow();
    expect(() => isCnpj("07.081.092/0001-74")).toThrow();
  });
});
