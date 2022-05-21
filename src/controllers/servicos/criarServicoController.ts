import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Servico } from "@prisma/client";

import {
  campoObrigatorio,
  composeValidator,
  isNumber,
  isString,
  max999999,
  min0,
} from "../../utils/validations";

export class CriarServicoController {
  async handle(request: Request<Servico>, response: Response) {
    const { nome, preco } = request.body;

    // Validações no campo nome
    composeValidator({
      validators: [campoObrigatorio, isString],
      value: nome,
      nome: "nome",
    });

    // Validações no campo preço
    composeValidator({
      validators: [campoObrigatorio, isNumber, min0, max999999],
      value: preco,
      nome: "preço",
    });

    // Cria o serviço no banco de dados
    const servico = await prismaClient.servico
      .create({
        data: {
          nome,
          preco,
        },
      })
      .catch(() => {
        //Retorna erro caso o serviço não seja criado
        throw new Error("Ocorreu um erro ao criar o serviço.");
      });

    return response.json(servico);
  }
}
