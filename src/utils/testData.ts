import { ExpenseData } from '../types';

const categories = ['食品', '交通', '住房', '娱乐', '医疗', '教育'];

export const generateTestData = (): ExpenseData[] => {
  const testData: ExpenseData[] = [];
  const currentDate = new Date();
  const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());

  for (let d = new Date(oneYearAgo); d <= currentDate; d.setDate(d.getDate() + 1)) {
    const numExpenses = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numExpenses; i++) {
      testData.push({
        date: new Date(d),
        category: categories[Math.floor(Math.random() * categories.length)],
        amount: Math.floor(Math.random() * 1000) + 10,
        description: '测试数据',
      });
    }
  }

  return testData;
};