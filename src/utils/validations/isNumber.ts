import { ValidationError } from "../errors/validationError";

interface IsNumber {
  value: any;
  nome?: string;
}

const isNumber = ({ value, nome }: IsNumber) => {
  if (Number.isNaN(Number(value))) {
    if (nome) {
      throw new ValidationError(`O ${nome} deve ser um número`);
    } else {
      throw new ValidationError("O valor informado não é um número");
    }
  }
};

export { isNumber };
