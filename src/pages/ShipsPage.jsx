import { useState } from "react";
import { useShips } from "../contexts/ShipsContext";
import ShipForm from "../components/Ships/ShipForm";
import { Link } from "react-router-dom";

const ShipsPage = () => {
  const { ships, deleteShip } = useShips();
  const [editShip, setEditShip] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ships</h2>

      <ShipForm
        editMode={!!editShip}
        shipToEdit={editShip}
        onFinish={() => setEditShip(null)}
      />

      {ships.length === 0 ? (
        <p>No ships available.</p>
      ) : (
        <ul className="space-y-3">
          {ships.map((ship) => (
            <li key={ship.id} className="border p-4 rounded shadow">
              <p>
                <strong>Name:</strong>{" "}
                <Link to={`/ships/${ship.id}`} className="text-blue-600 underline">
                  {ship.name}
                </Link>
              </p>
              <p><strong>IMO:</strong> {ship.imo}</p>
              <p><strong>Flag:</strong> {ship.flag}</p>
              <p><strong>Status:</strong> {ship.status}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => setEditShip(ship)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteShip(ship.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShipsPage;
