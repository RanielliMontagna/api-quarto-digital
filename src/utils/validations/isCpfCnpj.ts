import { ValidationError } from "../errors/validationError";

const isCpf = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf == "") {
    throw new ValidationError(`O valor ${cpf} não é um CPF válido`);
  }

  if (cpf.length != 11) {
    throw new ValidationError(`O valor ${cpf} não é um CPF válido`);
  }

  // Elimina CPFs invalidos conhecidos
  if (
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  ) {
    throw new ValidationError(`O valor ${cpf} não é um CPF válido`);
  }
  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) {
    throw new ValidationError(`O valor ${cpf} não é um CPF válido`);
  }
  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) {
    throw new ValidationError(`O valor ${cpf} não é um CPF válido`);
  }
  return undefined;
};

const isCnpj = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") {
    throw new ValidationError(`O valor ${cnpj} não é um CNPJ válido`);
  }

  if (cnpj.length != 14) {
    throw new ValidationError(`O valor ${cnpj} não é um CNPJ válido`);
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
    throw new ValidationError(`O valor ${cnpj} não é um CNPJ válido`);
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
    throw new ValidationError(`O valor ${cnpj} não é um CNPJ válido`);
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
    throw new ValidationError(`O valor ${cnpj} não é um CNPJ válido`);
  }

  return undefined;
};

const isCpfCnpj = ({ value }: { value: string; nome: string }) => {
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

export { isCpf, isCnpj, isCpfCnpj };
