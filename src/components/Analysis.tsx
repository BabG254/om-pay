import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

interface AnalysisData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const initialData: AnalysisData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Usage',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      label: 'Profits',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};

function Analysis() {
  const [data, setData] = useState<AnalysisData>(initialData);
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'threeMonths' | 'sixMonths' | 'year'>('day');

  useEffect(() => {
    // Fetch data based on selected period
    // Update data state
  }, [selectedPeriod]);

  const handleFilterChange = (period: 'day' | 'week' | 'month' | 'threeMonths' | 'sixMonths' | 'year') => {
    setSelectedPeriod(period);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Analysis</h2>
      <div className="mb-4">
        <select
          value={selectedPeriod}
          onChange={(e) => handleFilterChange(e.target.value as 'day' | 'week' | 'month' | 'threeMonths' | 'sixMonths' | 'year')}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="day">Last 1 Day</option>
          <option value="week">Last 1 Week</option>
          <option value="month">Last 1 Month</option>
          <option value="threeMonths">Last 3 Months</option>
          <option value="sixMonths">Last 6 Months</option>
          <option value="year">Last 1 Year</option>
        </select>
      </div>
      <Line options={chartOptions} data={data} />
    </div>
  );
}

export default Analysis;