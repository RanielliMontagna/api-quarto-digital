interface CampoObrigatorio {
  value: string | number;
  nome?: string;
}

const campoObrigatorio = ({ value, nome }: CampoObrigatorio) => {
  if (value) {
    return undefined;
  } else if (nome) {
    throw new Error(`O campo ${nome} é obrigatório`);
  }
  throw new Error("Campo obrigatório não informado");
};

export { campoObrigatorio };
