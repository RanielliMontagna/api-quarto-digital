import { campoObrigatorio } from "../campoObrigatorio";

// Testes campo não encontrado
describe("Função para verificar se o campo é obrigatório", () => {
  it("Campo preenchido", () => {
    const campo = "Ranielli";
    expect(campoObrigatorio({ value: campo })).toBeUndefined();
  });
  it("Campo vazio", () => {
    const campo = "";
    expect(() => campoObrigatorio({ value: campo })).toThrow();
  });
  it("Campo vazio com nome específicado", () => {
    const campo = "";
    expect(() => campoObrigatorio({ value: campo, nome: "Nome" })).toThrow();
  });
});
