import { Request, Response } from "express";

import { ClientesRepository } from "../../repositories/clientes/clientesRepository";
import { HospedagemRepository } from "../../repositories/hospedagem/hospedagemRepository";
import { QuartosRepository } from "../../repositories/quartos/quartosRepository";

import useTokenDecoded from "../../utils/useTokenDecoded";
import {
  campoObrigatorio,
  composeValidator,
  isInteger,
  isString,
} from "../../utils/validations";

export class CriarHospedagemController {
  async handle(request: Request, response: Response) {
    // Busca o id do usuário logado
    const { id } = useTokenDecoded(request);

    const clientesRepository = new ClientesRepository();
    const quartosRepository = new QuartosRepository();
    const hospedagemRepository = new HospedagemRepository();

    // Busca os dados da hospedagem
    const { codigoCliente, codigoQuarto, dataEntrada, dataSaida, observacao } =
      request.body;

    // Validações no campo codigoCliente
    composeValidator({
      validators: [campoObrigatorio, isInteger],
      value: codigoCliente,
      nome: "codigoCliente",
    });

    // Validações no campo codigoQuarto
    composeValidator({
      validators: [campoObrigatorio, isInteger],
      value: codigoQuarto,
      nome: "codigoQuarto",
    });

    // Validações no campo dataEntrada
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: dataEntrada,
      nome: "dataEntrada",
    });

    // Validações no campo dataSaida
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: dataSaida,
      nome: "dataSaida",
    });

    // Validação da observação
    composeValidator({
      validators: [isString],
      value: observacao,
      nome: "observacao",
    });

    // Verifica se data de saída é maior que data de entrada
    if (dataSaida < dataEntrada) {
      throw new Error("Data de saída não pode ser menor que data de entrada");
    }

    // Verifica se o cliente existe
    const cliente = await clientesRepository.buscarCliente({
      id: Number(codigoCliente),
      usuarioId: Number(id),
    });

    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    // Verifica se o quarto existe
    const quarto = await quartosRepository.buscarQuarto({
      id: Number(codigoQuarto),
      usuarioId: Number(id),
    });

    if (!quarto) {
      throw new Error("Quarto não encontrado");
    }

    // Adiciona a hospedagem
    const hospedagem = await hospedagemRepository.criarHospedagem({
      codigoCliente: Number(codigoCliente),
      codigoQuarto: Number(codigoQuarto),
      dataEntrada,
      dataSaida,
      usuarioId: Number(id),
    });

    return response.status(201).json(hospedagem);
  }
}
