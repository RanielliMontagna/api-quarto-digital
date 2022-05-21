interface ComposeValidator {
  validators: Array<Function>;
  value: number;
  nome?: string;
}

export const composeValidator = ({
  validators,
  value,
  nome,
}: ComposeValidator) => {
  for (let i = 0; i < validators.length; i++) {
    validators[i]({ value, nome });
  }
};
