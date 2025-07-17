import { useState } from "react";
import { searchSweets } from "../services/api";

export default function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({ name: "", category: "" });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const { data } = await searchSweets(filters);
      onSearch(data);
    } catch (error) {
      alert("Search failed");
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-wrap sm:flex-nowrap items-end gap-4 sm:gap-2 w-full sm:w-auto">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Search by name"
        className="border border-gray-300 px-3 py-2 rounded-md w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />
      <input
        type="text"
        name="category"
        value={filters.category}
        onChange={handleChange}
        placeholder="Search by category"
        className="border border-gray-300 px-3 py-2 rounded-md w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />
      <button
        onClick={handleSearch}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium shadow transition"
      >
        Search
      </button>
    </div>
  );
}
