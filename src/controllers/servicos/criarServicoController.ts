import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";

import {
  campoObrigatorio,
  composeValidator,
  isNumber,
  isString,
  max999999,
  min0,
} from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { ServicosRepository } from "../../repositories/servicos/servicosRepository";

export class CriarServicoController {
  async handle(request: Request, response: Response) {
    const { nome, preco } = request.body;
    const { id } = useTokenDecoded(request);

    const servicosRepository = new ServicosRepository();

    // Validações no campo nome
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: nome,
      nome: "nome",
    });

    // Validações no campo preço
    composeValidator({
      validators: [campoObrigatorio, isNumber, min0, max999999],
      value: preco,
      nome: "preço",
    });

    // Cria o serviço no banco de dados
    const servico = await servicosRepository.criarServico({
      nome,
      preco,
      usuarioId: Number(id),
    });

    return response.json(servico);
  }
}
