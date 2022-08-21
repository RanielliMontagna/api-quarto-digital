export interface IBuscarCliente {
  id: number;
  usuarioId: number;
}

export interface IBuscarClientes {
  params: Record<string, string>;
  usuarioId: number;
}

export interface ICriarCliente {
  email: string;
  cpfCnpj: string;
  nome: string;
  telefone: string;
  dataNasc: string;
  usuarioId: number;
}

export interface IEditarCliente extends Omit<ICriarCliente, "usuarioId"> {
  id: number;
}

export interface IDeletarCliente {
  id: number;
}
