import { campoNaoEncontrado } from "../campoNaoEncontrado";

// Testes campo não encontrado
describe("Função para verificar se o campo foi encontrado", () => {
  it("Campo preenchido", () => {
    const campo = "Ranielli";
    expect(campoNaoEncontrado({ value: campo })).toBeUndefined();
  });
  it("Campo vazio", () => {
    const campo = undefined;
    expect(() => campoNaoEncontrado({ value: campo })).toThrow();
  });
  it("Campo vazio com nome específicado", () => {
    const campo = "";
    expect(() => campoNaoEncontrado({ value: campo, nome: "Nome" })).toThrow();
  });
});
