export interface IBuscarQuarto {
  id: number;
  usuarioId: number;
}

export interface IBuscarQuartos {
  params: Record<string, string>;
  usuarioId: number;
}

export interface ICriarQuarto {
  identificacao: number;
  diaria: number;
  status?: number;
  usuarioId: number;
}

export interface IEditarQuarto extends Omit<ICriarQuarto, "usuarioId"> {
  id: number;
}

export interface IDeletarQuarto {
  id: number;
}

export interface IAlterarStatusQuarto {
  id: number;
  status: number;
}
