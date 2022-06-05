import { ValidationError } from "../errors/validationError";

interface IsString {
  value: any;
  nome?: string;
}

const isString = ({ value, nome }: IsString) => {
  if (typeof value !== "string") {
    if (nome) {
      throw new ValidationError(`O ${nome} deve ser uma string`);
    } else {
      throw new ValidationError("O valor informado não é uma string");
    }
  } else {
    if (value.length > 500) {
      if (nome) {
        throw new ValidationError(
          `O ${nome} não pode ser maior que 500 caracteres`
        );
      } else {
        throw new ValidationError(
          "O texto informado não pode conter mais que 500 caracteres"
        );
      }
    }
  }
};

export { isString };
