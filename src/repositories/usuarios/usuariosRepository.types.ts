export interface IBuscarUsuario {
  id: number;
}

export interface IBuscarUsuarios {
  params: Record<string, string>;
}

export interface ICriarUsuario {
  email: string;
  nome: string;
  senha: string;
}

export interface IEditarUsuario extends Omit<ICriarUsuario, "usuarioId"> {
  id: number;
}

export interface IDeletarUsuario {
  id: number;
}
