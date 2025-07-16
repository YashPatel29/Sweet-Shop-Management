const request = require("supertest");
const app = require("../../app");
const sweets = require("../../models/sweetModel");

describe("Sweet Routes - /api/sweets", () => {
  beforeEach(() => {
    sweets.length = 0;
  });

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
});
