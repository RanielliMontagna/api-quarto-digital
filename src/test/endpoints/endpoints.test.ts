import { ProdutosTest } from "./produtos";
import { ServicosTest } from "./servicos";

require("dotenv").config();

//Executa os testes de serviços
ServicosTest();

//Executa os testes de produtos
ProdutosTest();
