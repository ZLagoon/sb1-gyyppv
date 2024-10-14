import React from 'react';
import { ExpenseData } from '../types';
import TimeSeriesChart from './charts/TimeSeriesChart';
import CategoryPieChart from './charts/CategoryPieChart';
import TimeCategoryHeatmap from './charts/TimeCategoryHeatmap';
import MonthlyBarChart from './charts/MonthlyBarChart';
import YearlyTrendChart from './charts/YearlyTrendChart';
import ThreeYearComparisonChart from './charts/ThreeYearComparisonChart';

const Dashboard = {
  TimeSeriesChart,
  CategoryPieChart,
  TimeCategoryHeatmap,
  MonthlyBarChart,
  YearlyTrendChart,
  ThreeYearComparisonChart,
};

export default Dashboard;