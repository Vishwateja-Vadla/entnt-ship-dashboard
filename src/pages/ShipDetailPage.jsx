import { useParams, useNavigate } from "react-router-dom";
import { useShips } from "../contexts/ShipsContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const ShipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ships, updateShip } = useShips();

  const ship = ships.find((s) => s.id === id);

  const [componentForm, setComponentForm] = useState({
    name: "",
    type: "",
    status: "Operational",
  });

  const [jobForm, setJobForm] = useState({});

  if (!ship) {
    return (
      <div className="p-6">
        <p>Ship not found.</p>
        <button onClick={() => navigate("/ships")} className="text-blue-600 underline">
          Back to Ships
        </button>
      </div>
    );
  }

  const handleComponentChange = (e) => {
    const { name, value } = e.target;
    setComponentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComponent = (e) => {
    e.preventDefault();
    const newComponent = { id: uuidv4(), ...componentForm };

    const updatedShip = {
      ...ship,
      components: [...(ship.components || []), newComponent],
    };

    updateShip(updatedShip);
    toast.success("Component added ✅");

    setComponentForm({ name: "", type: "", status: "Operational" });
  };

  const handleDeleteComponent = (componentId) => {
    const updatedShip = {
      ...ship,
      components: ship.components.filter((c) => c.id !== componentId),
    };
    updateShip(updatedShip);
    toast.info("Component deleted.");
  };

  const handleJobInputChange = (e, compId) => {
    const { name, value } = e.target;
    setJobForm((prev) => ({
      ...prev,
      [compId]: {
        ...prev[compId],
        [name]: value,
      },
    }));
  };

  const handleAddJob = (e, compId) => {
    e.preventDefault();
    const newJob = {
      id: uuidv4(),
      ...jobForm[compId],
    };

    const updatedShip = {
      ...ship,
      components: ship.components.map((c) =>
        c.id === compId
          ? {
              ...c,
              maintenance: [...(c.maintenance || []), newJob],
            }
          : c
      ),
    };

    updateShip(updatedShip);
    toast.success("Maintenance job added!");

    setJobForm((prev) => ({
      ...prev,
      [compId]: { description: "", date: "", status: "Scheduled" },
    }));
  };

  const handleDeleteJob = (compId, jobId) => {
    const updatedShip = {
      ...ship,
      components: ship.components.map((c) =>
        c.id === compId
          ? {
              ...c,
              maintenance: c.maintenance.filter((j) => j.id !== jobId),
            }
          : c
      ),
    };

    updateShip(updatedShip);
    toast.warning("Maintenance job deleted.");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ship Profile</h2>
      <p><strong>Name:</strong> {ship.name}</p>
      <p><strong>IMO:</strong> {ship.imo}</p>
      <p><strong>Flag:</strong> {ship.flag}</p>
      <p><strong>Status:</strong> {ship.status}</p>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">Components</h3>

      {(!ship.components || ship.components.length === 0) ? (
        <p>No components added.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {ship.components.map((comp) => (
            <li key={comp.id} className="border p-4 rounded">
              <p><strong>Name:</strong> {comp.name}</p>
              <p><strong>Type:</strong> {comp.type}</p>
              <p><strong>Status:</strong> {comp.status}</p>

              <h4 className="mt-3 font-semibold">Maintenance Jobs</h4>
              {(comp.maintenance && comp.maintenance.length > 0) ? (
                <ul className="ml-4 list-disc mb-2">
                  {comp.maintenance.map((job) => (
                    <li key={job.id}>
                      <strong>{job.date}:</strong> {job.description} – {job.status}
                      <button
                        className="ml-2 text-red-500"
                        onClick={() => handleDeleteJob(comp.id, job.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="ml-4">No maintenance records.</p>
              )}

              <form
                onSubmit={(e) => handleAddJob(e, comp.id)}
                className="mt-2 space-y-2"
              >
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={jobForm[comp.id]?.description || ""}
                  onChange={(e) => handleJobInputChange(e, comp.id)}
                  required
                  className="border px-2 py-1 w-full"
                />
                <input
                  type="date"
                  name="date"
                  value={jobForm[comp.id]?.date || ""}
                  onChange={(e) => handleJobInputChange(e, comp.id)}
                  required
                  className="border px-2 py-1 w-full"
                />
                <select
                  name="status"
                  value={jobForm[comp.id]?.status || "Scheduled"}
                  onChange={(e) => handleJobInputChange(e, comp.id)}
                  className="border px-2 py-1 w-full"
                >
                  <option>Scheduled</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <button className="bg-green-600 text-white px-3 py-1 rounded">
                  Add Job
                </button>
              </form>

              <button
                onClick={() => handleDeleteComponent(comp.id)}
                className="mt-3 px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete Component
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-lg font-semibold mb-2">Add New Component</h3>
      <form onSubmit={handleAddComponent} className="space-y-3">
        <input
          name="name"
          value={componentForm.name}
          onChange={handleComponentChange}
          required
          placeholder="Component Name"
          className="border p-2 w-full"
        />
        <input
          name="type"
          value={componentForm.type}
          onChange={handleComponentChange}
          required
          placeholder="Component Type"
          className="border p-2 w-full"
        />
        <select
          name="status"
          value={componentForm.status}
          onChange={handleComponentChange}
          className="border p-2 w-full"
        >
          <option>Operational</option>
          <option>Needs Repair</option>
          <option>Replaced</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Component
        </button>
      </form>

      <button
        onClick={() => navigate("/ships")}
        className="mt-6 px-4 py-2 bg-gray-600 text-white rounded"
      >
        Back to Ships
      </button>
    </div>
  );
};

export default ShipDetailPage;
