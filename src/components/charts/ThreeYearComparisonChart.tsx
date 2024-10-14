import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExpenseData } from '../../types';

interface ThreeYearComparisonChartProps {
  data: ExpenseData[];
}

const ThreeYearComparisonChart: React.FC<ThreeYearComparisonChartProps> = ({ data }) => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 2, currentYear - 1, currentYear];

  const chartData = data.reduce((acc, curr) => {
    const year = curr.date.getFullYear();
    const month = curr.date.getMonth();
    if (years.includes(year)) {
      if (!acc[month]) {
        acc[month] = { month: month + 1 };
      }
      acc[month][`${year}`] = (acc[month][`${year}`] || 0) + curr.amount;
    }
    return acc;
  }, {} as Record<number, { month: number; [key: string]: number }>);

  const sortedData = Object.values(chartData).sort((a, b) => a.month - b.month);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">近三年月支出环比对照图</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {years.map((year, index) => (
            <Bar key={year} dataKey={`${year}`} fill={`hsl(${index * 120}, 70%, 50%)`} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-4 text-sm text-gray-600">
        数据源：用户上传的支出数据<br />
        展示逻辑：展示近三年每月支出金额，以柱状图形式对比<br />
        作用：直观比较近三年同期支出情况，识别季节性模式和年度变化
      </p>
    </div>
  );
};

export default ThreeYearComparisonChart;