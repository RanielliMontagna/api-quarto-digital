import { Request, Response } from "express";
import {
  campoObrigatorio,
  composeValidator,
  isNumber,
  isString,
  max99999,
  min0,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";
import { ServicosRepository } from "../../repositories/servicos/servicosRepository";

export class EditarServicoController {
  async handle(request: Request, response: Response) {
    const { id, nome, preco } = request.body;

    const servicosRepository = new ServicosRepository();

    // Validações no campo id
    composeValidator({
      validators: [campoObrigatorio, isNumber],
      value: id,
      nome: "id",
    });

    // Validações no campo nome
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: nome,
      nome: "nome",
    });

    // Validações no campo preço
    composeValidator({
      validators: [campoObrigatorio, isNumber, min0, max99999],
      value: preco,
      nome: "preço",
    });

    // Edita o serviço no banco de dados
    const servico = await servicosRepository.editarServico({
      id,
      nome,
      preco,
    });

    return response.json(servico);
  }
}
