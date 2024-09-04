import React, { useState, useEffect } from 'react';
import { useStocks } from '../hooks/useStocks';
import StockList from './StockList';
import StockChart from './StockChart';
import { StockData } from '../types';

export default function StockDashboard() {
  const { stocks, loading, error } = useStocks();
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [stockData, setStockData] = useState<StockData[]>([]);

  useEffect(() => {
    if (stocks.length > 0 && !selectedStock) {
      setSelectedStock(stocks[0].symbol);
    }
  }, [stocks, selectedStock]);

  useEffect(() => {
    if (selectedStock) {
      const generateMockData = () => {
        const now = new Date();
        return Array.from({ length: 20 }, (_, i) => ({
          time: new Date(now.getTime() - (19 - i) * 60000).toISOString(),
          price: Math.random() * 100 + 100,
        }));
      };

      setStockData(generateMockData());

      const interval = setInterval(() => {
        setStockData(prevData => [
          ...prevData.slice(1),
          { time: new Date().toISOString(), price: Math.random() * 100 + 100 },
        ]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [selectedStock]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Real - time Stock Market App</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Stock List</h2>
          <StockList 
            stocks={stocks} 
            onSelectStock={setSelectedStock} 
            selectedStock={selectedStock} 
          />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Stock Chart</h2>
          {selectedStock && <StockChart data={stockData} symbol={selectedStock} />}
        </div>
      </div>
    </div>
  );
}