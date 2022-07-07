import { Request, Response } from "express";
import axios from "axios";

import { isCnpj } from "../../utils/validations/isCpfCnpj";

export class CnpjController {
  async handle(request: Request, response: Response) {
    // Pega o CNPJ do parâmetro da URL
    const { cnpj } = request.params;

    // Verifica se o CNPJ é válido
    isCnpj(cnpj);

    // Faz a requisição na consulta de CNPJ da receita
    axios.defaults.timeout = 8000;
    try {
      // Consulta o CNPJ na ReceitaWS
      const res = await axios.get(
        `https://www.receitaws.com.br/v1/cnpj/${encodeURI(cnpj)}`
      );
      if (res.status === 200) {
        return response.json(res.data);
      }
      throw new Error("Erro ao consultar o CNPJ");
    } catch (error) {
      throw new Error(error as any);
    }
  }
}
