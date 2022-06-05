import { ValidationError } from "../errors/validationError";

interface IsInteger {
  value: any;
  nome?: string;
}

const isInteger = ({ value, nome }: IsInteger) => {
  if (!Number.isInteger(Number(value))) {
    if (nome) {
      throw new ValidationError(`O ${nome} deve ser um número`);
    } else {
      throw new ValidationError("O valor informado não é um número");
    }
  }
};

export { isInteger };
