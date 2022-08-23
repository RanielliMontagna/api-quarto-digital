import { ValidationError } from "../errors/validationError";

interface IsNumber {
  value: any;
  nome?: string;
}

const isNumber = ({ value, nome }: IsNumber) => {
  if (typeof value !== "number") {
    throw new ValidationError(`O campo ${nome} deve ser um número.`);
  }
};

export { isNumber };
