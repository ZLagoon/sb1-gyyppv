import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Modal from './components/Modal';
import { ExpenseData } from './types';
import { generateTestData } from './utils/testData';

function App() {
  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  const handleFileUpload = (data: ExpenseData[]) => {
    setExpenseData(data);
  };

  const handleGenerateTestData = () => {
    const testData = generateTestData();
    setExpenseData(testData);
  };

  const handleChartClick = (chartKey: string) => {
    setSelectedChart(chartKey);
  };

  const closeModal = () => {
    setSelectedChart(null);
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <Header onFileUpload={handleFileUpload} onGenerateTestData={handleGenerateTestData} />
      <main className="container mx-auto px-4 py-8">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {Object.entries(Dashboard).map(([key, ChartComponent]) => (
            <div key={key} className="mb-4" onClick={() => handleChartClick(key)}>
              <ChartComponent data={expenseData} />
            </div>
          ))}
        </Masonry>
      </main>
      {selectedChart && (
        <Modal onClose={closeModal}>
          {React.createElement(Dashboard[selectedChart as keyof typeof Dashboard], { data: expenseData })}
        </Modal>
      )}
    </div>
  );
}

export default App;