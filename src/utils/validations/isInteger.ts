interface IsInteger {
  value: any;
  nome?: string;
}

const isInteger = ({ value, nome }: IsInteger) => {
  if (!Number.isInteger(Number(value))) {
    if (nome) {
      throw new Error(`O ${nome} deve ser um número`);
    } else {
      throw new Error("O valor informado não é um número");
    }
  }
};

export { isInteger };
