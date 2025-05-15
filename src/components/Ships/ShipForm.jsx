import { useState, useEffect } from "react";
import { useShips } from "../../contexts/ShipsContext";

import { v4 as uuidv4 } from "uuid";

const ShipForm = ({ editMode = false, shipToEdit, onFinish }) => {
  const { addShip, updateShip } = useShips();

  const [form, setForm] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active",
  });

  useEffect(() => {
    if (editMode && shipToEdit) {
      setForm(shipToEdit);
    }
  }, [editMode, shipToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (editMode) {
    updateShip(form);
  } else {
    const newShip = {
      id: uuidv4(),
      ...form,
    };
    addShip(newShip); // ✅ This must be called here
  }

  setForm({ name: "", imo: "", flag: "", status: "Active" });
  if (onFinish) onFinish();
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <h3 className="text-xl font-semibold">
        {editMode ? "Edit Ship" : "Add New Ship"}
      </h3>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        placeholder="Name"
        className="border p-2 w-full"
      />
      <input
        name="imo"
        value={form.imo}
        onChange={handleChange}
        required
        placeholder="IMO Number"
        className="border p-2 w-full"
      />
      <input
        name="flag"
        value={form.flag}
        onChange={handleChange}
        required
        placeholder="Flag"
        className="border p-2 w-full"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option>Active</option>
        <option>Under Maintenance</option>
        <option>Decommissioned</option>
      </select>
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        {editMode ? "Save Changes" : "Add Ship"}
      </button>
    </form>
  );
};

export default ShipForm;
