function validateSweet(sweet) {
  if (!sweet || typeof sweet !== "object") {
    return { valid: false, message: "Sweet must be a valid object." };
  }

  const { id, name, category, price, quantity } = sweet;

  if (!id || typeof id !== "number")
    return { valid: false, message: "ID must be a number." };
  if (!name || typeof name !== "string" || name.trim() === "")
    return { valid: false, message: "Name is required." };
  if (!category || typeof category !== "string" || category.trim() === "")
    return { valid: false, message: "Category is required." };
  if (typeof price !== "number" || price < 0)
    return { valid: false, message: "Price must be a non-negative number." };
  if (typeof quantity !== "number" || quantity < 0)
    return { valid: false, message: "Quantity must be a non-negative number." };

  return { valid: true };
}

module.exports = validateSweet;
