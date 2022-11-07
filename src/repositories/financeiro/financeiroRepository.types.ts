export interface IAdicionarFinanceiro {
  /**
   * 0 - Receita
   * 1 - Despesa
   */
  tipo: 0 | 1;
  valor: number;
  descricao?: string;

  hospedagemId?: number;
  usuarioId?: number;
}
