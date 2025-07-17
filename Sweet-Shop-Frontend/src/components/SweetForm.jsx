import { useState } from "react";
import { addSweet } from "../services/api";
import { toast } from "react-toastify";

export default function SweetForm({ onAdd }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSweet({
        ...form,
        id: +form.id,
        price: +form.price,
        quantity: +form.quantity,
      });
      toast.success("Sweet added successfully");
      onAdd(); // refresh list
      setForm({ id: "", name: "", category: "", price: "", quantity: "" });
    } catch (err) {
      console.error("Error adding sweet:", err);
      alert(err.response?.data?.error || "Error adding sweet");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Add New Sweet</h2>
      <div className="grid grid-cols-2 gap-4">
        {["id", "name", "category", "price", "quantity"].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            required
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border px-3 py-2 rounded"
          />
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Sweet
      </button>
    </form>
  );
}
