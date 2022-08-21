import { Request, Response } from "express";

import { isInteger } from "../../utils/validations";
import { ClientesRepository } from "../../repositories/clientes/clientesRepository";

export class ExcluirClienteController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const clientesRepository = new ClientesRepository();

    // Verifica se o id é um número inteiro
    isInteger({ value: id, nome: "código" });

    // Exclui o cliente no banco de dados
    await clientesRepository.deletarCliente({ id: Number(id) });

    return response.status(200).json();
  }
}
