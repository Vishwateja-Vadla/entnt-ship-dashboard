import { useShips } from "../contexts/ShipsContext";
import KPIChart from "../components/Dashboard/KPIChart";

const DAYS_OVERDUE = 180;

const DashboardPage = () => {
  const { ships } = useShips();

  const totalShips = ships.length;
  const allComponents = ships.flatMap(ship => ship.components || []);

  const isOverdue = (component) => {
    if (!component.maintenance || component.maintenance.length === 0) return true;

    const lastDate = component.maintenance.reduce((latest, job) => {
      const jobDate = new Date(job.date);
      return jobDate > latest ? jobDate : latest;
    }, new Date(0));

    const daysSince = (Date.now() - lastDate.getTime()) / (1000 * 3600 * 24);
    return daysSince > DAYS_OVERDUE;
  };

  const overdueComponents = allComponents.filter(isOverdue).length;
  const allJobs = allComponents.flatMap(c => c.maintenance || []);
  const jobsInProgress = allJobs.filter(j => j.status === "In Progress").length;
  const jobsCompleted = allJobs.filter(j => j.status === "Completed").length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">KPIs Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Total Ships</h2>
          <p className="text-4xl mt-2">{totalShips}</p>
        </div>
        <div className="bg-red-600 text-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Components Overdue</h2>
          <p className="text-4xl mt-2">{overdueComponents}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Jobs In Progress</h2>
          <p className="text-4xl mt-2">{jobsInProgress}</p>
        </div>
        <div className="bg-green-600 text-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Jobs Completed</h2>
          <p className="text-4xl mt-2">{jobsCompleted}</p>
        </div>
      </div>

      <KPIChart
        totalShips={totalShips}
        overdueComponents={overdueComponents}
        inProgressJobs={jobsInProgress}
        completedJobs={jobsCompleted}
      />
    </div>
  );
};

export default DashboardPage;
