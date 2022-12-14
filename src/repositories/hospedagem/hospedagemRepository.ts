import { prismaClient } from "../../database/prismaClient";
import type {
  IAdicionarProdutoHospedagem,
  ICriarHospedagem,
  IBuscarHospedagem,
  IAdicionarServicoHospedagem,
  IAlterarStatusHospedagem,
  IBuscarHospedagens,
} from "./hospedagemRepository.types";

export class HospedagemRepository {
  // Criar uma hospedagem
  async criarHospedagem({
    codigoCliente,
    codigoQuarto,
    dataEntrada,
    dataSaida,
    usuarioId,
    observacao,
  }: ICriarHospedagem) {
    const hospedagem = await prismaClient.hospedagem.create({
      data: {
        clienteId: codigoCliente,
        quartoId: codigoQuarto,
        dataEntrada,
        dataSaida,
        observacao,
        usuarioId,
      },
    });

    return hospedagem;
  }

  async listarHospedagens({ usuarioId, params }: IBuscarHospedagens) {
    const hospedagens = await prismaClient.hospedagem.findMany({
      where: {
        usuarioId,
        ...params,
      },
      select: {
        id: true,
        dataEntrada: true,
        dataSaida: true,
        observacao: true,
        status: true,
        Cliente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
          },
        },
        Quarto: {
          select: {
            id: true,
            identificacao: true,
            diaria: true,
          },
        },
        Financeiro: {
          select: {
            valor: true,
          },
        },
        alteradoEm: true,
        criadoEm: true,
        Usuario: {
          select: {
            nome: true,
          },
        },
      },
      orderBy: {
        criadoEm: "desc",
      },
    });

    return hospedagens;
  }

  // Buscar uma hospedagem
  async buscarHospedagem({
    codigoHospedagem,
    codigoUsuario,
  }: IBuscarHospedagem) {
    const hospedagem = await prismaClient.hospedagem.findFirst({
      where: {
        id: codigoHospedagem,
        usuarioId: codigoUsuario,
      },
      select: {
        id: true,
        dataEntrada: true,
        dataSaida: true,
        observacao: true,
        status: true,
        Cliente: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            cpfCnpj: true,
            email: true,
          },
        },
        ProdutosHospedagem: {
          select: {
            id: true,
            produtoNome: true,
            produtoPreco: true,
            quantidade: true,
          },
        },
        ServicosHospedagem: {
          select: {
            id: true,
            servicoNome: true,
            servicoPreco: true,
            quantidade: true,
          },
        },
        Quarto: {
          select: {
            identificacao: true,
            diaria: true,
          },
        },
        alteradoEm: true,
        criadoEm: true,
        Usuario: {
          select: {
            nome: true,
          },
        },
      },
    });

    return hospedagem;
  }

  async adicionarProdutoHospedagem({
    codigoHospedagem,
    produto,
    quantidade,
  }: IAdicionarProdutoHospedagem) {
    const produtoHospedagem = await prismaClient.produtosHospedagem.create({
      data: {
        produtoNome: produto.nome,
        produtoPreco: produto.preco,
        quantidade,
        hospedagemId: codigoHospedagem,
        produtoId: produto.codigo,
      },
    });

    return produtoHospedagem;
  }

  async adicionarServicoHospedagem({
    codigoHospedagem,
    servico,
    quantidade,
  }: IAdicionarServicoHospedagem) {
    const servicoHospedagem = await prismaClient.servicosHospedagem.create({
      data: {
        servicoNome: servico.nome,
        servicoPreco: servico.preco,
        quantidade,
        hospedagemId: codigoHospedagem,
        servicoId: servico.codigo,
      },
    });

    return servicoHospedagem;
  }

  async alterarStatusHospedagem({
    codigoHospedagem,
    status,
  }: IAlterarStatusHospedagem) {
    const hospedagem = await prismaClient.hospedagem.update({
      where: {
        id: codigoHospedagem,
      },
      data: {
        status,
      },
    });

    return hospedagem;
  }
}
