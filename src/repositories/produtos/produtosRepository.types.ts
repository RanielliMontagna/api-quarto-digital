export interface IBuscarProduto {
  id: number;
  usuarioId: number;
}

export interface IBuscarProdutos {
  params: Record<string, string>;
  usuarioId: number;
}

export interface ICriarProduto {
  nome: string;
  preco: number;
  usuarioId: number;
}

export interface IEditarProduto extends Omit<ICriarProduto, "usuarioId"> {
  id: number;
}

export interface IDeletarProduto {
  id: number;
}
