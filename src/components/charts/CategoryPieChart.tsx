import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ExpenseData } from '../../types';

interface CategoryPieChartProps {
  data: ExpenseData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
  const chartData = data.reduce((acc, curr) => {
    const existingCategory = acc.find(item => item.name === curr.category);
    if (existingCategory) {
      existingCategory.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">支出类别分布</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <p className="mt-4 text-sm text-gray-600">
        数据源：用户上传的支出数据<br />
        展示逻辑：按支出类别汇总金额，以饼图形式展示各类别占比<br />
        作用：直观显示各支出类别的比重，帮助用户识别主要支出方向
      </p>
    </div>
  );
};

export default CategoryPieChart;