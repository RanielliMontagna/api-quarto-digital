export interface ICriarHospedagem {
  codigoCliente: number;
  codigoQuarto: number;
  dataEntrada: Date;
  dataSaida?: Date;
  observacao?: string;
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
