import { useState, useEffect } from "react";
import { fetchSweets } from "./services/api";
import SweetForm from "./components/SweetForm";
import SweetList from "./components/SweetList";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [sweets, setSweets] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadSweets = async () => {
    try {
      const { data } = await fetchSweets();
      setSweets(data);
    } catch (error) {
      console.error("Failed to fetch sweets", error);
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 shadow-lg py-6 mb-8 rounded-b-xl">
        <h1 className="text-4xl font-extrabold text-center text-white tracking-wide drop-shadow-md">
          🍬 Sweet Shop Management
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Add Button + Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-md shadow transition"
          >
            <span className="text-xl">+</span>
            <span>{showForm ? "Close Form" : "Add Sweet"}</span>
          </button>

          <SearchBar onSearch={setSweets} />
        </div>

        {/* Conditional Sweet Form */}
        {showForm && <SweetForm onAdd={loadSweets} />}

        {/* Sweet List Table */}
        <SweetList sweets={sweets} onRefresh={loadSweets} />
      </main>

      {/* React Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export default App;
