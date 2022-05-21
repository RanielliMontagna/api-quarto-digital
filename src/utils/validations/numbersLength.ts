interface NumbersLength {
  value: any;
  nome?: string;
}

const max999999 = ({ value, nome }: NumbersLength) => {
  if (Number(value) > 999999) {
    if (nome) {
      throw new Error(`O ${nome} não pode ser maior que 999999`);
    } else {
      throw new Error("Número não pode ser maior que 999999");
    }
  }
};

const max99999 = ({ value, nome }: NumbersLength) => {
  if (Number(value) > 99999) {
    if (nome) {
      throw new Error(`O ${nome} não pode ser maior que 99999`);
    } else {
      throw new Error("Número não pode ser maior que 99999");
    }
  }
};

const min0 = ({ value, nome }: NumbersLength) => {
  if (Number(value) < 0) {
    if (nome) {
      throw new Error(`O ${nome} não pode ser menor que 0`);
    } else {
      throw new Error("Número não pode ser menor que 0");
    }
  }
};

export { min0, max99999, max999999 };
