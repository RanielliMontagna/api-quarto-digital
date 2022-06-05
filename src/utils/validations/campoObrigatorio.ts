import { ValidationError } from "../errors/validationError";
interface CampoObrigatorio {
  value: string | number;
  nome?: string;
}

const campoObrigatorio = ({ value, nome }: CampoObrigatorio) => {
  if (value) {
    return undefined;
  } else if (nome) {
    throw new ValidationError(`O campo ${nome} é obrigatório`);
  }
  throw new ValidationError("Campo obrigatório não informado");
};

export { campoObrigatorio };
