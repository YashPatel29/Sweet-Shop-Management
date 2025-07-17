import { deleteSweet, purchaseSweet, restockSweet } from "../services/api";

export default function SweetList({ sweets, onRefresh }) {
  const handleAction = async (id, type) => {
    const quantity = +prompt(`${type} quantity:`);
    if (!quantity || quantity < 1) return;

    try {
      if (type === "purchase") await purchaseSweet(id, quantity);
      else await restockSweet(id, quantity);
      onRefresh();
    } catch (err) {
      alert(err.response?.data?.error || "Action failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b pb-2">
        Available Sweets
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 rounded-lg overflow-hidden text-sm">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sweets.map((s, idx) => (
              <tr
                key={s.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2 px-4 border text-center">{s.id}</td>
                <td className="py-2 px-4 border text-center">{s.name}</td>
                <td className="py-2 px-4 border text-center">{s.category}</td>
                <td className="py-2 px-4 border text-center">{s.price}</td>
                <td className="py-2 px-4 border text-center">{s.quantity}</td>
                <td className="py-2 px-4 border">
                  <div className="flex gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => handleAction(s.id, "purchase")}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded shadow"
                    >
                      Purchase
                    </button>
                    <button
                      onClick={() => handleAction(s.id, "restock")}
                      className="bg-amber-400 hover:bg-amber-500 text-white px-3 py-1 rounded shadow"
                    >
                      Restock
                    </button>
                    <button
                      onClick={async () => {
                        await deleteSweet(s.id);
                        onRefresh();
                      }}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded shadow"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
