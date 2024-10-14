import * as XLSX from 'xlsx';
import { ExpenseData } from '../types';

export const parseExcel = async (file: File): Promise<ExpenseData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

      const parsedData: ExpenseData[] = jsonData.map((row: any) => ({
        date: new Date(row['日期']),
        category: row['类别'],
        amount: parseFloat(row['金额']),
        description: row['描述'],
      }));

      resolve(parsedData);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const downloadTemplate = () => {
  const template = [
    ['日期', '类别', '金额', '描述'],
    ['2024-03-01', '食品', '100', '超市购物'],
    ['2024-03-02', '交通', '50', '地铁费用'],
  ];

  const ws = XLSX.utils.aoa_to_sheet(template);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '支出数据');

  XLSX.writeFile(wb, '支出数据模板.xlsx');
};