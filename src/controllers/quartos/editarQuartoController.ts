import { Request, Response } from "express";
import {
  campoObrigatorio,
  composeValidator,
  isNumber,
  max99999,
  min0,
} from "../../utils/validations";
import { QuartosRepository } from "../../repositories/quartos/quartosRepository";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class EditarQuartoController {
  async handle(request: Request, response: Response) {
    const { id, identificacao, diaria } = request.body;
    const token = useTokenDecoded(request);

    const quartosRepository = new QuartosRepository();

    // Validações no campo id
    composeValidator({
      validators: [campoObrigatorio, isNumber],
      value: id,
      nome: "id",
    });

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
      idUsuario: Number(token.id),
      idQuarto: id,
    });

    if (quartoJaExiste) {
      throw new Error("Identificação já existente.");
    }

    // Edita o quarto no banco de dados
    const quarto = await quartosRepository.editarQuarto({
      id,
      identificacao,
      diaria,
    });

    return response.json(quarto);
  }
}
