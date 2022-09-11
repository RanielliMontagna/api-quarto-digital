import request from "supertest";
import { app } from "../../server";

const ServicosTest = () => {
  describe("Buscar serviços", () => {
    it("Deve retornar uma lista de serviços", async () => {
      const response = await request(app)
        .get("/servicos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("Buscar um serviço em específico", () => {
    it("Deve retornar um json do serviço", async () => {
      const response = await request(app)
        .get("/servicos/2")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("nome");
      expect(response.body).toHaveProperty("preco");
    });
  });

  describe("Erro ao buscar um serviço específico e não encontrar", () => {
    it("Deve retornar uma mensagem de erro", async () => {
      const response = await request(app)
        .get("/servicos/1243")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("erro");
      expect(response.body.erro).toBe("Nenhum serviço encontrado");
    });
  });

  describe("Criar um serviço", () => {
    it("Deve criar um serviço", async () => {
      const response = await request(app)
        .post("/servicos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          nome: "Serviço de teste",
          preco: 10.5,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("nome");
      expect(response.body).toHaveProperty("preco");

      const response2 = await request(app)
        .get(`/servicos/${response.body.id}`)
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST);

      expect(response2.status).toBe(200);
      expect(response2.body).toHaveProperty("id");
      expect(response2.body).toHaveProperty("nome");
      expect(response2.body).toHaveProperty("preco");
    });
  });

  describe("Erro ao criar um serviço, ao não passar o preço", () => {
    it("Deve retornar a mensagem: 'O campo preço é obrigatório'", async () => {
      const response = await request(app)
        .post("/servicos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          nome: "Produto de teste",
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("erro");
      expect(response.body.erro).toBe("O campo preço é obrigatório");
    });
  });

  describe("Erro ao criar um serviço, ao não passar o nome", () => {
    it("Deve retornar a mensagem: 'O campo nome é obrigatório'", async () => {
      const response = await request(app)
        .post("/servicos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          preco: 10.5,
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("erro");
      expect(response.body.erro).toBe("O campo nome é obrigatório");
    });
  });

  describe("Atualizar um serviço", () => {
    it("Deve atualizar um serviço", async () => {
      const id = 2;

      const response = await request(app)
        .put("/servicos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({ id, nome: "Serviço de teste", preco: 10.5 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("nome");
      expect(response.body).toHaveProperty("preco");

      const response2 = await request(app)
        .get(`/servicos/${id}`)
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST);

      expect(response2.status).toBe(200);
      expect(response2.body).toHaveProperty("id");
      expect(response2.body).toHaveProperty("nome");
    });
  });

  describe("Erro ao atualizar um serviço, ao não passar o preço", () => {
    it("Deve retornar a mensagem: 'O campo preço é obrigatório'", async () => {
      const response = await request(app)
        .put("/servicos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          id: 2,
          nome: "Serviço de teste",
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("erro");
      expect(response.body.erro).toBe("O campo preço é obrigatório");
    });
  });

  describe("Erro ao atualizar um serviço, ao não passar o nome", () => {
    it("Deve retornar a mensagem: 'O campo nome é obrigatório'", async () => {
      const response = await request(app)
        .put("/servicos")
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

  describe("Erro ao atualizar um serviço, ao não passar o id", () => {
    it("Deve retornar a mensagem: 'O campo id é obrigatório'", async () => {
      const response = await request(app)
        .put("/servicos")
        .set("Authorization", "Bearer " + process.env.TOKEN_TEST)
        .send({
          nome: "Serviço de teste",
          preco: 10.5,
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("erro");
      expect(response.body.erro).toBe("O campo id é obrigatório");
    });
  });
};

export { ServicosTest };
