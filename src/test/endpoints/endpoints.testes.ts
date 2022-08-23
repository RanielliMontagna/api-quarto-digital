import { ProdutosTest } from "./produtos";
import { ServicosTest } from "./servicos";

require("dotenv").config();

//TODO: implementar testes nos endpoints

//Executa os testes de serviços
ServicosTest();

//Executa os testes de produtos
ProdutosTest();
