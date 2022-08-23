import { ValidationError } from "../errors/validationError";

const cpfWithDots = (cpf: string) => {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

const isCpf = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf === "") {
    return undefined;
  }

  if (cpf.length !== 11) {
    throw new ValidationError(
      `O valor ${cpfWithDots(cpf)} não é um CPF válido`
    );
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
    throw new ValidationError(
      `O valor ${cpfWithDots(cpf)} não é um CPF válido`
    );
  }
  // Valida 1o digito
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) {
    throw new ValidationError(
      `O valor ${cpfWithDots(cpf)} não é um CPF válido`
    );
  }
  // Valida 2o digito
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) {
    throw new ValidationError(
      `O valor ${cpfWithDots(cpf)} não é um CPF válido`
    );
  }
  return undefined;
};

export { isCpf };
