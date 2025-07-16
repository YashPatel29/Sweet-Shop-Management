const sweets = require("../../models/sweetModel");

describe("Sweet Model (In-Memory)", () => {
  beforeEach(() => {
    sweets.length = 0; // Reset model before each test
  });

  test("should start empty", () => {
    expect(sweets).toHaveLength(0);
  });

  test("should add a sweet to the model", () => {
    sweets.push({
      id: 1,
      name: "Ladoo",
      category: "Gram-Based",
      price: 10,
      quantity: 5,
    });

    expect(sweets).toHaveLength(1);
    expect(sweets[0].name).toBe("Ladoo");
  });
});
