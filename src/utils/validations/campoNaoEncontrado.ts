interface ResultadoNaoEncontrado {
  value: any;
  nome?: string;
}

const campoNaoEncontrado = ({ value, nome }: ResultadoNaoEncontrado) => {
  if (!value) {
    if (nome) {
      throw new Error(`Nenhum ${nome} encontrado`);
    } else {
      throw new Error("Nenhum resultado encontrado");
    }
  }
};

export { campoNaoEncontrado };
