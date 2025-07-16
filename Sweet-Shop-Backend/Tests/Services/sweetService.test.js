const sweetService = require("../../Services/sweetService");
const sweets = require("../../models/sweetModel");

describe("Sweet Service", () => {
  beforeEach(() => {
    sweets.length = 0;
  });

  test("should add a valid sweet", () => {
    const sweet = {
      id: 10,
      name: "Soan Papdi",
      category: "Flaky",
      price: 30,
      quantity: 10,
    };

    const result = sweetService.addSweet(sweet);
    expect(result).toMatchObject(sweet);
    expect(sweets).toHaveLength(1);
  });

  test("should throw error for duplicate ID", () => {
    const sweet = {
      id: 11,
      name: "Barfi",
      category: "Milk",
      price: 20,
      quantity: 5,
    };
    sweetService.addSweet(sweet);

    expect(() => sweetService.addSweet(sweet)).toThrow(
      "Sweet ID must be unique."
    );
  });

  test("should throw error for invalid sweet input", () => {
    const badSweet = {
      id: 12,
      name: "",
      category: "",
      price: -5,
      quantity: -2,
    };
    expect(() => sweetService.addSweet(badSweet)).toThrow();
  });
});
