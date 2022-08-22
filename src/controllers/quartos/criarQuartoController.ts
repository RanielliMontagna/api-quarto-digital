import { Request, Response } from "express";

import {
  campoObrigatorio,
  composeValidator,
  isNumber,
  max99999,
  min0,
} from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { QuartosRepository } from "../../repositories/quartos/quartosRepository";

export class CriarQuartoController {
  async handle(request: Request, response: Response) {
    const { identificacao, diaria } = request.body;
    const { id } = useTokenDecoded(request);

    const quartosRepository = new QuartosRepository();

    // Validações no campo identificacao
    composeValidator({
      validators: [campoObrigatorio, isNumber, min0, max99999],
      value: identificacao,
      nome: "identificacao",
    });

    // Validações no campo diaria
    composeValidator({
      validators: [campoObrigatorio, isNumber, min0, max99999],
      value: diaria,
      nome: "diaria",
    });

    // Verificar se a identificação já existe
    const quartoJaExiste = await quartosRepository.identificacaoJaExiste({
      identificacao,
      idUsuario: id,
    });

    if (quartoJaExiste) {
      throw new Error("Identificação já existente.");
    }

    // Cria o quarto no banco de dados
    const quarto = await quartosRepository.criarQuarto({
      identificacao,
      diaria,
      usuarioId: Number(id),
    });

    return response.json(quarto);
  }
}
