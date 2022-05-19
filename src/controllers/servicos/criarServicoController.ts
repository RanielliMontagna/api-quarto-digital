import { prismaClient } from "../../database/prismaClient";
import { Request, Response } from "express";
import { Servico } from "@prisma/client";

import { campoObrigatorio, isNumber, isString } from "../../utils/validations";

export class CriarServicoController {
  async handle(request: Request<Servico>, response: Response) {
    const { nome, preco } = request.body;

    // Erro caso o nome não seja informado
    campoObrigatorio({ value: nome, nome: "nome" });

    // Erro caso o preço não seja informado
    campoObrigatorio({ value: preco, nome: "preço" });

    // Verifica se o nome é uma string
    isString({ value: nome, nome: "nome" });

    // Verifica se o preço é um número
    isNumber({ value: preco, nome: "preço" });

    // Cria o serviço no banco de dados
    const servico = await prismaClient.servico.create({
      data: {
        nome,
        preco,
      },
    });

    //Retorna erro caso o servico não seja criado
    if (!servico) throw new Error("Ocorreu um erro ao criar o serviço");

    return response.json(servico);
  }
}
