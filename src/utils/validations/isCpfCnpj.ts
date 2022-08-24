import { ValidationError } from "../errors/validationError";

import { isCnpj } from "./isCnpj";
import { isCpf } from "./isCpf";

const isCpfCnpj = ({ value }: { value: string }) => {
  if (!value) {
    return undefined;
  }
  if (!isNaN(Number(value))) {
    if (value.length === 11) {
      const cpf = isCpf(value);
      if (cpf === undefined) {
        return undefined;
      }
    } else if (value.length === 14) {
      const cnpj = isCnpj(value);
      if (cnpj === undefined) {
        return undefined;
      }
    }
  }
  throw new ValidationError("O valor informado não é um CPF/CNPJ");
};

export { isCpfCnpj };
