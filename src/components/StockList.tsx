import React from 'react';
import { Stock } from '../types';

interface StockListProps {
  stocks: Stock[];
  onSelectStock: (symbol: string) => void;
  selectedStock: string;
}

export default function StockList({ stocks, onSelectStock, selectedStock }: StockListProps) {
  return (
    <div className="overflow-x-auto" style={{ height: '52dvh', overflowY: 'auto' }}>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-300">
          <tr>
            <th className="py-4 px-4 text-left" style={{ color: '#121212' }}>Symbol</th>
            <th className="py-4 px-4 text-left" style={{ color: '#121212' }}>Name</th>
            <th className="py-4 px-4 text-right" style={{ color: '#121212' }}>Price</th>
            <th className="py-4 px-4 text-right" style={{ color: '#121212' }}>Change</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr 
              key={stock.symbol} 
              className={`cursor-pointer hover:bg-gray-50 ${selectedStock === stock.symbol ? 'bg-blue-50' : ''}`}
              onClick={() => onSelectStock(stock.symbol)}
            >
              <td className="py-2 px-4" style={{ color: '#121212' }}>{stock.symbol}</td>
              <td className="py-2 px-4" style={{ color: '#121212' }}>{stock.name}</td>
              <td className="py-2 px-4 text-right" style={{ color: '#121212' }}>${stock.price.toFixed(2)}</td>
              <td className={`py-2 px-4 text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.change.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}