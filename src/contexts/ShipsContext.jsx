import { createContext, useContext, useEffect, useState } from "react";

const ShipsContext = createContext();

const getShipsFromStorage = () => {
  const data = localStorage.getItem("ships");
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    localStorage.removeItem("ships");
    return [];
  }
};


export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState(getShipsFromStorage);

  useEffect(() => {
    localStorage.setItem("ships", JSON.stringify(ships));
  }, [ships]);

  const addShip = (ship) => {
  console.log("📦 addShip called with:", ship);
  setShips((prev) => {
    const updated = [...prev, ship];
    console.log("🧠 Updated ships list:", updated);
    return updated;
  });
};



  const deleteShip = (id) => setShips(ships.filter((s) => s.id !== id));

  const updateShip = (updatedShip) => {
    setShips((prev) => prev.map((s) => (s.id === updatedShip.id ? updatedShip : s)));
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, deleteShip, updateShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

// THIS export is essential for your components to use the context:
export const useShips = () => useContext(ShipsContext);
