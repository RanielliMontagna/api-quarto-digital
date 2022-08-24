import { Request, Response } from "express";

import { campoNaoEncontrado, isInteger } from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { ClientesRepository } from "../../repositories/clientes/clientesRepository";
export class BuscarClienteController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const token = useTokenDecoded(request);

    const clientesRepository = new ClientesRepository();

    // Verifica se o id é um número inteiro
    isInteger({ value: Number(id), nome: "código" });

    // Busca o cliente no banco de dados
    const cliente = await clientesRepository.buscarCliente({
      id: Number(id),
      usuarioId: Number(token.id),
    });

    // Erro caso o cliente não seja encontrado
    campoNaoEncontrado({ value: cliente, nome: "cliente" });

    return response.json(cliente);
  }
}
