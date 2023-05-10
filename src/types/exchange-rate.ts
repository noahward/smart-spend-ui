export type ExchangeRate = {
  from: string;
  to: string;
  exchangeRate: number;
  lastUpdated: string | Date;
}

export type ExchRateAPIResponse = {
  currencyPair: string;
  exchangeRate: number;
}
