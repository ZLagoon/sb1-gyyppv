import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExpenseData } from '../../types';

interface MonthlyBarChartProps {
  data: ExpenseData[];
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ data }) => {
  const chartData = data.reduce((acc, curr) => {
    const month = curr.date.getMonth();
    const year = curr.date.getFullYear();
    const key = `${year}-${month}`;
    if (!acc[key]) {
      acc[key] = { month: `${year}-${month + 1}`, amount: 0 };
    }
    acc[key].amount += curr.amount;
    return acc;
  }, {} as Record<string, { month: string; amount: number }>);

  const sortedData = Object.values(chartData).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">每月支出柱状图</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-4 text-sm text-gray-600">
        数据源：用户上传的支出数据<br />
        展示逻辑：按月份汇总支出金额，以柱状图形式展示<br />
        作用：直观显示每月支出总额，便于比较不同月份的支出情况
      </p>
    </div>
  );
};

export default MonthlyBarChart;