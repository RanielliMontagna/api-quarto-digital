import { Request, Response } from "express";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { ServicosRepository } from "../../repositories/servicos/servicosRepository";

export class ListarServicosController {
  async handle(request: Request, response: Response) {
    const { id } = useTokenDecoded(request);
    const { query } = request;

    const servicosRepository = new ServicosRepository();

    let params = {};
    // Parâmetros de search da query
    if (query?.search) {
      params = {
        nome: {
          contains: String(query?.search),
          mode: "insensitive",
        },
      };
    }

    const servicos = await servicosRepository.buscarServicos({
      params,
      usuarioId: Number(id),
    });

    return response.json(servicos);
  }
}
