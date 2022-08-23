import { emailValido } from "../emailValido";

// Testes de validação de email
describe("Função de validação de email", () => {
  it("Email válido", () => {
    const email = "raniellimontagna@hotmail.com";
    expect(emailValido({ value: email })).toBeUndefined();
  });
  it("Email inválido", () => {
    const email = "raniellimontagnahotmail.com";
    expect(() => emailValido({ value: email })).toThrow();
  });
  it("Email vazio", () => {
    const email = "";
    expect(emailValido({ value: email })).toBeUndefined();
  });
});
