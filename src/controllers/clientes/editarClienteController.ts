import { Request, Response } from "express";
import {
  campoObrigatorio,
  composeValidator,
  emailValido,
  isCpfCnpj,
  isNumber,
  isString,
} from "../../utils/validations";
import { ValidationError } from "../../utils/errors/validationError";
import useTokenDecoded from "../../utils/useTokenDecoded";
import { ClientesRepository } from "../../repositories/clientes/clientesRepository";

export class EditarClienteController {
  async handle(request: Request, response: Response) {
    const { id, email, nome, telefone, dataNasc, cpfCnpj } = request.body;
    const token = useTokenDecoded(request);

    const clientesRepository = new ClientesRepository();

    // Validações no campo id
    composeValidator({
      validators: [campoObrigatorio, isNumber],
      value: id,
      nome: "id",
    });

    // Validações no campo cpfCnpj
    composeValidator({
      validators: [isString, isCpfCnpj],
      value: cpfCnpj,
      nome: "cpfCnpj",
    });

    // Validações no campo email
    composeValidator({
      validators: [isString, emailValido],
      value: email,
      nome: "email",
    });

    // Validações no campo nome
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: nome,
      nome: "nome",
    });

    // Validações no campo nome
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
        idCliente: id,
        idUsuario: token.id,
      });
      if (cliente) {
        throw new ValidationError("Já existe um cliente com este CPF/CNPJ");
      }
    }

    // Verificar se já existe um cliente com o email informado
    const clienteExistente = await clientesRepository.emailJaExiste({
      email,
      idCliente: id,
      idUsuario: token.id,
    });

    if (clienteExistente) {
      throw new ValidationError("Já existe um cliente com este email");
    }

    // Edita o cliente no banco de dados
    const cliente = await clientesRepository.editarCliente({
      id: Number(id),
      email,
      nome,
      telefone,
      dataNasc,
      cpfCnpj,
    });

    return response.json(cliente);
  }
}
