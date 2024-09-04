import { useState, useEffect } from 'react';
import { Stock } from '../types';

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('/api/stocks');
        if (!response.ok) {
          throw new Error('Failed to fetch stocks');
        }
        const data = await response.json();
        setStocks(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stocks');
        setLoading(false);
      }
    };

    fetchStocks();
    const interval = setInterval(fetchStocks, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { stocks, loading, error };
}