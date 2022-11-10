export interface ICriarHospedagem {
  codigoCliente: number;
  codigoQuarto: number;
  dataEntrada: Date;
  dataSaida?: Date;
  observacao?: string;
  usuarioId: number;
}

export type IStatus = 0 | 1 | 2 | 3 | 4;
export interface IBuscarHospedagens {
  params: {
    search?: string;
    status?: IStatus;
  };
  usuarioId: number;
}

export interface IBuscarHospedagem {
  codigoHospedagem: number;
  codigoUsuario: number;
}

export interface IAdicionarProdutoHospedagem {
  codigoUsuario: number;
  codigoHospedagem: number;
  produto: {
    codigo: number;
    nome: string;
    preco: number;
  };
  quantidade: number;
}

export interface IAdicionarServicoHospedagem {
  codigoUsuario: number;
  codigoHospedagem: number;
  servico: {
    codigo: number;
    nome: string;
    preco: number;
  };
  quantidade: number;
}

export interface IAlterarStatusHospedagem {
  codigoHospedagem: number;
  /**
   * 0 - Em aberto
   * 1 - Finalizada
   * 2 - Cancelado
   */
  status: 0 | 1 | 2;
}
