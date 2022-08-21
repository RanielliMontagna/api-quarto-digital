export interface IBuscarServico {
  id: number;
  usuarioId: number;
}

export interface IBuscarServicos {
  params: Record<string, string>;
  usuarioId: number;
}

export interface ICriarServico {
  nome: string;
  preco: number;
  usuarioId: number;
}

export interface IEditarServico extends Omit<ICriarServico, "usuarioId"> {
  id: number;
}

export interface IDeletarServico {
  id: number;
}
