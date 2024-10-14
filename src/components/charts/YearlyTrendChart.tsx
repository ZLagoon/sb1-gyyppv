import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExpenseData } from '../../types';

interface YearlyTrendChartProps {
  data: ExpenseData[];
}

const YearlyTrendChart: React.FC<YearlyTrendChartProps> = ({ data }) => {
  const chartData = data.reduce((acc, curr) => {
    const year = curr.date.getFullYear();
    if (!acc[year]) {
      acc[year] = { year, amount: 0 };
    }
    acc[year].amount += curr.amount;
    return acc;
  }, {} as Record<number, { year: number; amount: number }>);

  const sortedData = Object.values(chartData).sort((a, b) => a.year - b.year);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">每年支出趋势图</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-4 text-sm text-gray-600">
        数据源：用户上传的支出数据<br />
        展示逻辑：按年份汇总支出金额，以折线图形式展示<br />
        作用：展示年度支出趋势，帮助识别长期支出模式
      </p>
    </div>
  );
};

export default YearlyTrendChart;