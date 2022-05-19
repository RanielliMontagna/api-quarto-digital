interface IsNumber {
  value: any;
  nome?: string;
}

const isNumber = ({ value, nome }: IsNumber) => {
  if (Number.isNaN(value)) {
    if (nome) {
      throw new Error(`O ${nome} deve ser um número`);
    } else {
      throw new Error("O valor informado não é um número");
    }
  }
};

export { isNumber };
