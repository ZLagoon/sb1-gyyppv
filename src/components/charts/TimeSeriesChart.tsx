import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExpenseData } from '../../types';

interface TimeSeriesChartProps {
  data: ExpenseData[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const chartData = data.reduce((acc, curr) => {
    const date = curr.date.toISOString().split('T')[0];
    const existingEntry = acc.find(item => item.date === date);
    if (existingEntry) {
      existingEntry.amount += curr.amount;
    } else {
      acc.push({ date, amount: curr.amount });
    }
    return acc;
  }, [] as { date: string; amount: number }[]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">支出时间趋势</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-4 text-sm text-gray-600">
        数据源：用户上传的支出数据<br />
        展示逻辑：按日期汇总支出金额，展示支出随时间的变化趋势<br />
        作用：帮助用户识别支出的周期性模式和异常支出时间点
      </p>
    </div>
  );
};

export default TimeSeriesChart;