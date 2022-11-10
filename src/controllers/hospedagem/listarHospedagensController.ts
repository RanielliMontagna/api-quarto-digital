import { IStatus } from "./../../repositories/hospedagem/hospedagemRepository.types";
import { Request, Response } from "express";

import { HospedagemRepository } from "../../repositories/hospedagem/hospedagemRepository";
import useTokenDecoded from "../../utils/useTokenDecoded";

export class ListarHospedagensController {
  async handle(request: Request, response: Response) {
    const hospedagemRepository = new HospedagemRepository();

    // Pega o id do usuário e os parâmetros da query
    const token = useTokenDecoded(request);
    const { query } = request;

    let params = {};

    const status = Number(query?.status) as IStatus;
    if (status) {
      switch (status) {
        case 1:
          params = {
            ...params,
            dataEntrada: {
              lte: new Date(),
            },
            status: 0,
          };
          break;
        case 2:
          params = {
            ...params,
            dataEntrada: {
              gte: new Date(),
            },
            status: 0,
          };
          break;
        case 3:
          params = {
            ...params,
            status: 1,
          };
          break;
        case 4:
          params = {
            ...params,
            status: 2,
          };
          break;
        default:
          break;
      }
    }
    // Parâmetros de search da query
    if (query?.search) {
      params = {
        ...params,
        Cliente: {
          nome: {
            contains: String(query?.search),
            mode: "insensitive",
          },
        },
      };
    }

    // Busca as hospedagens no banco de dados
    const hospedagens = await hospedagemRepository.listarHospedagens({
      usuarioId: token.id,
      params,
    });

    // Retorna as hospedagens
    return response.json(hospedagens);
  }
}
