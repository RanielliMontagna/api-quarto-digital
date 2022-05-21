interface IsString {
  value: any;
  nome?: string;
}

const isString = ({ value, nome }: IsString) => {
  if (typeof value !== "string") {
    if (nome) {
      throw new Error(`O ${nome} deve ser uma string`);
    } else {
      throw new Error("O valor informado não é uma string");
    }
  } else {
    if (value.length > 500) {
      if (nome) {
        throw new Error(`O ${nome} não pode ser maior que 500 caracteres`);
      } else {
        throw new Error(
          "O texto informado não pode conter mais que 500 caracteres"
        );
      }
    }
  }
};

export { isString };
