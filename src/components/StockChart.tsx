import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StockData } from '../types';

interface StockChartProps {
  data: StockData[];
  symbol: string;
}

export default function StockChart({ data, symbol }: StockChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(label) => new Date(label).toLocaleString()}
            formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Price']}
          />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} name={symbol} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}