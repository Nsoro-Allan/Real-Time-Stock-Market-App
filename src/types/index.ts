export interface Stock {
    symbol: string;
    name: string;
    price: number;
    change: number;
  }
  
  export interface StockData {
    time: string;
    price: number;
  }