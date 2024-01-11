/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const BarChart = ({ options, data }) => {
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;