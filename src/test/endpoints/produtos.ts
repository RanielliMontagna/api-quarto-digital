import request from "supertest";
import { app } from "../../server";

const ProdutosTest = () => {
  describe("Buscar produtos", () => {
    it("Deve retornar uma lista de produtos", async () => {
      const response = await request(app)
        .get("/produtos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("Buscar um produto em específico", () => {
    it("Deve retornar um json do produto", async () => {
      const response = await request(app)
        .get("/produtos/2")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("nome");
      expect(response.body).toHaveProperty("preco");
    });
  });

  describe("Erro ao buscar um produto específico e não encontrar", () => {
    it("Deve retornar uma mensagem de erro", async () => {
      const response = await request(app)
        .get("/produtos/1243")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("erro");
      expect(response.body.erro).toBe("Nenhum produto encontrado");
    });
  });

  describe("Criar um produto", () => {
    it("Deve criar um produto", async () => {
      const response = await request(app)
        .post("/produtos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          nome: "Produto de teste",
          preco: 10.5,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("nome");
      expect(response.body).toHaveProperty("preco");
    });
  });

  describe("Erro ao criar um produto, ao não passar o preço", () => {
    it("Deve retornar a mensagem: 'O campo preço é obrigatório'", async () => {
      const response = await request(app)
        .post("/produtos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          nome: "Produto de teste",
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("erro");
      expect(response.body.erro).toBe("O campo preço é obrigatório");
    });
  });

  describe("Erro ao criar um produto, ao não passar o nome", () => {
    it("Deve retornar a mensagem: 'O campo nome é obrigatório'", async () => {
      const response = await request(app)
        .post("/produtos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          preco: 10.5,
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("erro");
      expect(response.body.erro).toBe("O campo nome é obrigatório");
    });
  });

  describe("Atualizar um produto", () => {
    it("Deve atualizar um produto", async () => {
      const response = await request(app)
        .put("/produtos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          id: 2,
          nome: "Produto de teste",
          preco: 10.5,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("nome");
      expect(response.body).toHaveProperty("preco");
    });
  });

  describe("Erro ao atualizar um produto, ao não passar o preço", () => {
    it("Deve retornar a mensagem: 'O campo preço é obrigatório'", async () => {
      const response = await request(app)
        .put("/produtos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          id: 2,
          nome: "Produto de teste",
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("erro");
      expect(response.body.erro).toBe("O campo preço é obrigatório");
    });
  });

  describe("Erro ao atualizar um produto, ao não passar o nome", () => {
    it("Deve retornar a mensagem: 'O campo nome é obrigatório'", async () => {
      const response = await request(app)
        .put("/produtos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          id: 2,
          preco: 10.5,
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("erro");
      expect(response.body.erro).toBe("O campo nome é obrigatório");
    });
  });

  describe("Erro ao atualizar um produto, ao não passar o id", () => {
    it("Deve retornar a mensagem: 'O campo id é obrigatório'", async () => {
      const response = await request(app)
        .put("/produtos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          nome: "Produto de teste",
          preco: 10.5,
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("erro");
      expect(response.body.erro).toBe("O campo id é obrigatório");
    });
  });
};

export { ProdutosTest };
