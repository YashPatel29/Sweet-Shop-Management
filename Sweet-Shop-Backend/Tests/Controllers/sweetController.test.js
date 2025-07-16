const sweetController = require("../../Controllers/sweetController");
const sweets = require("../../models/sweetModel");

describe("Sweet Controller", () => {
  let req, res;

  beforeEach(() => {
    sweets.length = 0;
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // Test for add sweet
  test("should return 201 and sweet object on success", () => {
    req.body = {
      id: 21,
      name: "Jalebi",
      category: "Fried",
      price: 15,
      quantity: 8,
    };

    sweetController.addSweet(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Sweet added successfully.",
        sweet: expect.objectContaining({ name: "Jalebi" }),
      })
    );
  });

  test("should return 400 if input is invalid", () => {
    req.body = { id: 22, name: "", category: "", price: -1, quantity: -5 };

    sweetController.addSweet(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String),
      })
    );
  });

  // Test for get all sweets
  test("getAllSweets: should return all sweets", () => {
    sweets.push({
      id: 20,
      name: "Kheer",
      category: "Milk-Based",
      price: 30,
      quantity: 6,
    });
    sweetController.getAllSweets(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ name: "Kheer" })])
    );
  });

  // For Remove Sweet
  test("deleteSweet: should return 200 if deleted", () => {
    sweets.push({
      id: 11,
      name: "Halwa",
      category: "Vegetable",
      price: 10,
      quantity: 5,
    });
    req = {
      body: {},
      params: { id: "11" },
      query: {},
    };
    sweetController.deleteSweet(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // For Search Sweet
  test("searchSweets: should return matching sweets", () => {
    sweets.push({
      id: 21,
      name: "Rasgulla",
      category: "Milk-Based",
      price: 30,
      quantity: 5,
    });
    sweets.push({
      id: 22,
      name: "Gulab Jamun",
      category: "Milk-Based",
      price: 20,
      quantity: 10,
    });
    req.query = { name: "rasgulla" };
    sweetController.searchSweets(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ name: "Rasgulla" })])
    );
  });
});
