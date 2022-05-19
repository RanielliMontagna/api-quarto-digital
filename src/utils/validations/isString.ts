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
  }
};

export { isString };
