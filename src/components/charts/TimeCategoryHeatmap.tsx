import React from 'react';
import { ResponsiveContainer, Tooltip, XAxis, YAxis, ScatterChart, Scatter, ZAxis } from 'recharts';
import { ExpenseData } from '../../types';

interface TimeCategoryHeatmapProps {
  data: ExpenseData[];
}

const TimeCategoryHeatmap: React.FC<TimeCategoryHeatmapProps> = ({ data }) => {
  const chartData = data.map(item => ({
    x: item.date.getMonth(),
    y: item.category,
    z: item.amount,
  }));

  const uniqueCategories = Array.from(new Set(data.map(item => item.category)));

  return (
    <div className="bg-white p-6 rounded-lg shadow col-span-2">
      <h2 className="text-xl font-semibold mb-4">时间-类别支出热力图</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis dataKey="x" name="月份" tickFormatter={(value) => `${value + 1}月`} />
          <YAxis dataKey="y" name="类别" type="category" data={uniqueCategories} />
          <ZAxis dataKey="z" range={[100, 3000]} name="金额" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={chartData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
      <p className="mt-4 text-sm text-gray-600">
        数据源：用户上传的支出数据<br />
        展示逻辑：x轴为月份，y轴为支出类别，气泡大小表示支出金额<br />
        作用：展示不同时间段各类别支出的分布情况，帮助识别季节性支出模式
      </p>
    </div>
  );
};

export default TimeCategoryHeatmap;