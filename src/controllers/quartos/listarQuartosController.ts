import { Request, Response } from "express";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { QuartosRepository } from "../../repositories/quartos/quartosRepository";

export class ListarQuartosController {
  async handle(request: Request, response: Response) {
    const { id } = useTokenDecoded(request);
    const { query } = request;

    const quartosRepository = new QuartosRepository();

    let params = {};
    // Parâmetros de search da query
    if (query?.search) {
      params = {
        identificacao: {
          contains: String(query?.search),
          mode: "insensitive",
        },
      };
    }

    // Endpoint para listar todos os quartos
    const quartos = await quartosRepository.buscarQuartos({
      params,
      usuarioId: Number(id),
    });

    return response.json(quartos);
  }
}
