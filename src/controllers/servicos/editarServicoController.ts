import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Servico } from "@prisma/client";
import {
  campoObrigatorio,
  isInteger,
  isNumber,
  isString,
} from "../../utils/validations";

export class EditarServicoController {
  async handle(request: Request<Servico>, response: Response) {
    const { id, nome, preco } = request.body;

    // Erro de campo obrigatório
    campoObrigatorio({ value: id, nome: "id" });
    campoObrigatorio({ value: nome, nome: "nome" });
    campoObrigatorio({ value: preco, nome: "preço" });

    // Verifica os tipos de dados
    isInteger({ value: id, nome: "id" });
    isString({ value: nome, nome: "nome" });
    isNumber({ value: preco, nome: "preço" });

    // Edita o serviço no banco de dados
    const servico = await prismaClient?.servico?.update({
      data: {
        nome,
        preco,
      },
      where: {
        id,
      },
    });

    // Retorna erro caso o serviço não seja editado
    if (!servico) throw new Error("Ocorreu um erro ao atualizar o serviço");

    return response.json(servico);
  }
}
