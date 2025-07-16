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

  // Test for retrieve sweets
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
});
