const sweetService = require("../../Services/sweetService");
const sweets = require("../../models/sweetModel");

describe("Sweet Service", () => {
  beforeEach(() => {
    sweets.length = 0;
  });

  // For Add sweet
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

  // For Add All Sweet
  test("getAllSweets: should return all sweets in the array", () => {
    const sweet1 = {
      id: 1001,
      name: "Kalakand",
      category: "Milk-Based",
      price: 30,
      quantity: 6,
    };
    const sweet2 = {
      id: 1002,
      name: "Balushahi",
      category: "Fried",
      price: 20,
      quantity: 8,
    };
    sweetService.addSweet(sweet1);
    sweetService.addSweet(sweet2);
    const allSweets = sweetService.getAllSweets();
    expect(allSweets).toHaveLength(2);
    expect(allSweets[0].name).toBe("Kalakand");
    expect(allSweets[1].name).toBe("Balushahi");
  });

  // For Delete Sweet
  test("deleteSweet: should remove existing sweet", () => {
    const sweet = {
      id: 2,
      name: "Peda",
      category: "Milk",
      price: 15,
      quantity: 10,
    };
    sweetService.addSweet(sweet);
    const deleted = sweetService.deleteSweet(2);
    expect(deleted.name).toBe("Peda");
    expect(sweets.length).toBe(0);
  });

  // For Search Sweet
  test("searchSweets: should find sweets by name and category", () => {
    sweetService.addSweet({
      id: 3,
      name: "Gulab Jamun",
      category: "Milk-Based",
      price: 10,
      quantity: 10,
    });
    const result = sweetService.searchSweets({
      name: "gulab",
      category: "Milk-Based",
    });
    expect(result.length).toBe(1);
  });

  // For Purchase Sweet
  test("purchaseSweet: should reduce quantity if stock is enough", () => {
    sweetService.addSweet({
      id: 4,
      name: "Imarti",
      category: "Fried",
      price: 12,
      quantity: 5,
    });
    const result = sweetService.purchaseSweet(4, 2);
    expect(result.quantity).toBe(3);
  });

  // For Restock Sweet
  test("restockSweet: should increase quantity", () => {
    sweetService.addSweet({
      id: 5,
      name: "Jalebi",
      category: "Fried",
      price: 8,
      quantity: 5,
    });
    const result = sweetService.restockSweet(5, 5);
    expect(result.quantity).toBe(10);
  });
});
