// import { Pie } from 'react-chartjs-2';
// import BarChart from '../components/dashboard/BarChart';

const options = {
  responsive: true,
};

const labels = [
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thusday',
  'Friday',
];

const data = {
  labels,
  datasets: [
    {
      label: 'Caller weekly Calls',
      data: ['5', '34', '55', '5', '34', '55'],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'green',
        'blue',
        'yellow',
        'red',
        'purple',
      ],
    },
  ],
};

const MarketingDashboard = () => {
  return (
    <div className="my-12 md:my-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center text-center items-center mb-32">
          <h4 className="text-lg font-semibold">Today Call: 456</h4>
          <h4 className="text-lg font-semibold">This week Call: 456</h4>
          <h4 className="text-lg font-semibold">This Month Call: 456</h4>
          <h4 className="text-lg font-semibold">This Year Call: 456</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* <BarChart data={data} options={options} /> */}
          <div>
            {/* <Pie data={data} options={options} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;