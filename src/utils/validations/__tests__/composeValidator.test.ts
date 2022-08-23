import { isInteger } from "../isInteger";
import { isNumber } from "../isNumber";

import { composeValidator } from "./../composeValidator";
describe("Função para juntar validações", () => {
  it("Há validações", () => {
    const valor = 1;
    expect(
      composeValidator({ value: valor, validators: [isNumber, isInteger] })
    ).toBeUndefined();
  });
  it("Há validações e uma delas falha", () => {
    const valor = "1";
    expect(() =>
      //@ts-expect-error
      composeValidator({ value: valor, validators: [isNumber, isInteger] })
    ).toThrow();
  });
});
