import { Request, Response } from "express";

import {
  campoObrigatorio,
  composeValidator,
  emailValido,
  isCpfCnpj,
  isString,
} from "../../utils/validations";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { ValidationError } from "../../utils/errors/validationError";
import { ClientesRepository } from "../../repositories/clientes/clientesRepository";

export class CriarClienteController {
  async handle(request: Request, response: Response) {
    const { email, nome, telefone, dataNasc, cpfCnpj } = request.body;
    const { id } = useTokenDecoded(request);

    const clientesRepository = new ClientesRepository();

    // Validações no campo email
    composeValidator({
      validators: [emailValido],
      value: email,
      nome: "email",
    });

    // Validações no campo cpfCnpj
    composeValidator({
      validators: [isString, isCpfCnpj],
      value: cpfCnpj,
      nome: "cpfCnpj",
    });

    // Validações no campo nome
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: nome,
      nome: "nome",
    });

    // Validações no campo telefone
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: telefone,
      nome: "telefone",
    });

    // Validações no campo data de nascimento
    composeValidator({
      validators: [isString],
      value: dataNasc,
      nome: "data de nascimento",
    });

    // Verifica se já existe um cliente com o mesmo cpfCnpj
    if (cpfCnpj) {
      const cliente = await clientesRepository.cpfCnpjJaExiste({
        cpfCnpj,
        idUsuario: id,
      });
      if (cliente) {
        throw new ValidationError("CPF/CNPJ já cadastrado");
      }
    }

    if (email) {
      // Verificar se já existe um cliente com o email informado
      const clienteExistente = await clientesRepository.emailJaExiste({
        email,
        idUsuario: id,
      });
      if (clienteExistente) {
        throw new ValidationError("Já existe um cliente com este email");
      }
    }

    // Cria o cliente no banco de dados
    const cliente = await clientesRepository.criarCliente({
      email,
      nome,
      telefone,
      dataNasc,
      cpfCnpj,
      usuarioId: Number(id),
    });

    return response.json(cliente);
  }
}
