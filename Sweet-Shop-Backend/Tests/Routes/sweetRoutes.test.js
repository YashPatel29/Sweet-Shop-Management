const request = require("supertest");
const app = require("../../app");
const sweets = require("../../models/sweetModel");

describe("Sweet Routes - /api/sweets", () => {
  beforeEach(() => {
    sweets.length = 0;
  });

  // For Add Sweet
  test("POST should add a sweet and return 201", async () => {
    const sweet = {
      id: 31,
      name: "Peda",
      category: "Milk",
      price: 25,
      quantity: 6,
    };

    const response = await request(app).post("/api/sweets").send(sweet);

    expect(response.statusCode).toBe(201);
    expect(response.body.sweet.name).toBe("Peda");
  });

  // For get all sweets
  test("GET should return list of sweets", async () => {
    await request(app).post("/api/sweets").send({
      id: 32,
      name: "Cham Cham",
      category: "Milk-Based",
      price: 18,
      quantity: 7,
    });

    const response = await request(app).get("/api/sweets");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // For Remove Sweet
  test("DELETE /api/sweets/:id should delete sweet", async () => {
    await request(app).post("/api/sweets").send({
      id: 200,
      name: "Sandesh",
      category: "Milk",
      price: 20,
      quantity: 5,
    });
    const res = await request(app).delete("/api/sweets/200");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  // For Search Sweet
  test("GET /api/sweets/search should return filtered results", async () => {
    await request(app).post("/api/sweets").send({
      id: 203,
      name: "Kheer",
      category: "Milk-Based",
      price: 25,
      quantity: 5,
    });
    const res = await request(app).get(
      "/api/sweets/search?category=Milk-Based"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  // For Purchase Sweet
  test("POST /api/sweets/purchase/:id should reduce stock", async () => {
    await request(app)
      .post("/api/sweets")
      .send({
        id: 201,
        name: "Mysore Pak",
        category: "Ghee",
        price: 40,
        quantity: 10,
      });
    const res = await request(app)
      .post("/api/sweets/purchase/201")
      .send({ quantity: 3 });
    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(7);
  });

  // For Restock Sweet
  test("POST /api/sweets/restock/:id should increase stock", async () => {
    await request(app)
      .post("/api/sweets")
      .send({
        id: 202,
        name: "Besan Ladoo",
        category: "Gram",
        price: 18,
        quantity: 5,
      });
    const res = await request(app)
      .post("/api/sweets/restock/202")
      .send({ quantity: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(10);
  });
});
