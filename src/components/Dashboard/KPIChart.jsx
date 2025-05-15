// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const KPIChart = ({ totalShips, overdueComponents, inProgressJobs, completedJobs }) => {
//   const data = {
//     labels: ["Total Ships", "Overdue Components", "Jobs In Progress", "Jobs Completed"],
//     datasets: [
//       {
//         label: "Count",
//         data: [totalShips, overdueComponents, inProgressJobs, completedJobs],
//         backgroundColor: [
//           "rgba(37, 99, 235, 0.7)",   // blue
//           "rgba(220, 38, 38, 0.7)",   // red
//           "rgba(234, 179, 8, 0.7)",   // yellow
//           "rgba(22, 163, 74, 0.7)",   // green
//         ],
//         borderRadius: 10,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//     },
//     scales: {
//       y: { beginAtZero: true, ticks: { stepSize: 1 } },
//     },
//   };

//   return (
//     <div className="mt-8">
//       <h2 className="text-xl font-bold mb-2">Maintenance Overview Chart</h2>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default KPIChart;

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const KPIChart = ({ totalShips, overdueComponents, inProgressJobs, completedJobs }) => {
  const data = {
    labels: ["Total Ships", "Overdue Components", "Jobs In Progress", "Jobs Completed"],
    datasets: [
      {
        label: "Count",
        data: [totalShips, overdueComponents, inProgressJobs, completedJobs],
        backgroundColor: [
          "rgba(37, 99, 235, 0.7)",
          "rgba(220, 38, 38, 0.7)",
          "rgba(234, 179, 8, 0.7)",
          "rgba(22, 163, 74, 0.7)",
        ],
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Maintenance Overview Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default KPIChart;
