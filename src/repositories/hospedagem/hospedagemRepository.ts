import { prismaClient } from "../../database/prismaClient";
import type {
  IAdicionarProdutoHospedagem,
  ICriarHospedagem,
  IBuscarHospedagem,
  IAdicionarServicoHospedagem,
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
}
