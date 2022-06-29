import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class ListarClientesController {
  async handle(request: Request, response: Response) {
    const { id } = useTokenDecoded(request);

    const cliente = await prismaClient.cliente
      .findMany({
        where: {
          usuarioId: id,
        },
        orderBy: {
          nome: "asc",
        },
      })
      .catch(() => {
        //Retornar erro caso os clientes não sejam listados
        throw new Error("Ocorreu um erro ao listar os clientes");
      });

    return response.json(cliente);
  }
}
