import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { ClientesRepository } from "../../repositories/clientes/clientesRepository";

export class ListarClientesController {
  async handle(request: Request, response: Response) {
    const { id } = useTokenDecoded(request);
    const { query } = request;

    const clientesRepository = new ClientesRepository();

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

    // Endpoint para listar todos os clientes
    const clientes = await clientesRepository.buscarClientes({
      params,
      usuarioId: Number(id),
    });

    return response.json(clientes);
  }
}
