import { Router } from "express";

import { BuscarHospedagemController } from "../controllers/hospedagem/buscarHospedagemController";
import { CriarHospedagemController } from "../controllers/hospedagem/criarHospedagemController";
import { AdicionarProdutoHospedagemController } from "../controllers/hospedagem/adicionarProdutoHospedagemController";
import { AdicionarServicoHospedagemController } from "../controllers/hospedagem/adicionarServicoHospedagemController";
import { AlterarStatusHospedagemController } from "../controllers/hospedagem/alterarStatusHospedagemController";

const hospedagemRouter = Router();

const criarHospedagem = new CriarHospedagemController();
const buscarHospedagem = new BuscarHospedagemController();
const adicionarProdutoHospedagem = new AdicionarProdutoHospedagemController();
const adicionarServicoHospedagem = new AdicionarServicoHospedagemController();
const alterarStatusHospedagem = new AlterarStatusHospedagemController();

/**
 * @openapi
 * /hospedagem:
 *   post:
 *     tags: [Hospedagem]
 *     description: Cria uma hospedagem para um cliente em um quarto específico
 *     summary: Insere uma hospedagem
 *     responses:
 *       200:
 *         description: Hospedagem criada com sucesso
 */
hospedagemRouter.post("/", criarHospedagem.handle);

/**
 * @openapi
 * /hospedagem/{id}:
 *   get:
 *     tags: [Hospedagem]
 *     description: Retorna as hospedagens cadastradas referente ao usuário logado.
 *     summary: Retorna as hospedagens cadastradas com o id especificado.
 *     responses:
 *       200:
 *         description: Retorna a hospedagem cadastrada com o id especificado.
 */
hospedagemRouter.get("/:id", buscarHospedagem.handle);

/**
 * @openapi
 * /hospedagem/produto:
 *   post:
 *    tags: [Hospedagem]
 *    description: Adiciona um produto a uma hospedagem
 *    summary: Adiciona um produto a uma hospedagem
 *    responses:
 *     200:
 *      description: Produto adicionado com sucesso
 *
 */
hospedagemRouter.post("/produto", adicionarProdutoHospedagem.handle);

/**
 * @openapi
 * /hospedagem/servico:
 *   post:
 *    tags: [Hospedagem]
 *    description: Adiciona um serviço a uma hospedagem
 *    summary: Adiciona um serviço a uma hospedagem
 *    responses:
 *     200:
 *      description: Serviço adicionado com sucesso
 *
 */
hospedagemRouter.post("/servico", adicionarServicoHospedagem.handle);

/**
 * @openapi
 * /hospedagem/status:
 *   put:
 *    tags: [Hospedagem]
 *    description: Altera o status de uma hospedagem
 *    summary: Altera o status de uma hospedagem
 *    responses:
 *     200:
 *      description: Status alterado com sucesso
 */
hospedagemRouter.put("/status", alterarStatusHospedagem.handle);

export { hospedagemRouter };
