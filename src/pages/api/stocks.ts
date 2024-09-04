import { NextApiRequest, NextApiResponse } from 'next';
import { Stock } from '../../types';

const stocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, change: 2.5 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: -0.3 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 305.15, change: 1.2 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3380.50, change: -1.5 },
  { symbol: 'FB', name: 'Meta Platforms Inc.', price: 330.20, change: 0.8 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Simulate price changes
    const updatedStocks = stocks.map(stock => ({
      ...stock,
      price: stock.price + (Math.random() - 0.5) * 5,
      change: (Math.random() - 0.5) * 3,
    }));
    res.status(200).json(updatedStocks);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}