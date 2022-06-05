import { ValidationError } from "../errors/validationError";

export const emailValido = ({ value }: { value: string; nome?: string }) => {
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (emailRegex.test(value)) {
    return undefined;
  } else {
    throw new ValidationError("Informe um email válido.");
  }
};
