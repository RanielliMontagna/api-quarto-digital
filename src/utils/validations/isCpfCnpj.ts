import { ValidationError } from "../errors/validationError";
import { isCpf } from "./isCpf";

const cnpjWithDots = (cnpj: string) => {
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};

const isCnpj = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") {
    return undefined;
  }

  if (cnpj.length != 14) {
    throw new ValidationError(
      `O valor ${cnpjWithDots(cnpj)} não é um CNPJ válido`
    );
  }

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  ) {
    throw new ValidationError(
      `O valor ${cnpjWithDots(cnpj)} não é um CNPJ válido`
    );
  }

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let digitos = cnpj.substring(tamanho);
  let numeros = cnpj.substring(0, tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != Number(digitos.charAt(0))) {
    throw new ValidationError(
      `O valor ${cnpjWithDots(cnpj)} não é um CNPJ válido`
    );
  }
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != Number(digitos.charAt(1))) {
    throw new ValidationError(
      `O valor ${cnpjWithDots(cnpj)} não é um CNPJ válido`
    );
  }

  return undefined;
};

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
      console.log(cnpj);
      if (cnpj === undefined) {
        return undefined;
      }
      throw new ValidationError("etste");
    }
  }
  throw new ValidationError("O valor informado não é um CPF/CNPJ");
};

export { isCnpj, isCpfCnpj };
