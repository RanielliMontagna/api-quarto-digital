import { ValidationError } from "../errors/validationError";

interface ResultadoNaoEncontrado {
  value: any;
  nome?: string;
}

const campoNaoEncontrado = ({ value, nome }: ResultadoNaoEncontrado) => {
  if (!value) {
    if (nome) {
      throw new ValidationError(`Nenhum ${nome} encontrado`);
    } else {
      throw new ValidationError("Nenhum resultado encontrado");
    }
  }
};

export { campoNaoEncontrado };
