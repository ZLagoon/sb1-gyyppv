import React from 'react';
import { Upload, Download, Database } from 'lucide-react';
import { ExpenseData } from '../types';
import { parseExcel, downloadTemplate } from '../utils/excelUtils';

interface HeaderProps {
  onFileUpload: (data: ExpenseData[]) => void;
  onGenerateTestData: () => void;
}

const Header: React.FC<HeaderProps> = ({ onFileUpload, onGenerateTestData }) => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const data = await parseExcel(file);
      onFileUpload(data);
    }
  };

  return (
    <header className="bg-white border-b border-[#d0d7de]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#24292f]">支出分析仪表盘</h1>
        <div className="flex space-x-4">
          <label className="btn btn-primary flex items-center cursor-pointer">
            <Upload className="w-5 h-5 mr-2" />
            导入数据
            <input type="file" className="hidden" onChange={handleFileChange} accept=".xlsx, .xls" />
          </label>
          <button className="btn btn-secondary flex items-center" onClick={downloadTemplate}>
            <Download className="w-5 h-5 mr-2" />
            导出模板
          </button>
          <button className="btn btn-info flex items-center" onClick={onGenerateTestData}>
            <Database className="w-5 h-5 mr-2" />
            生成测试数据
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;