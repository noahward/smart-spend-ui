export type Transaction = {
  id: number;
  date: string;
  description: string;
  currencyCode: string;
  amount: number;
  dateClassified: string | null;
  user: number;
  account: number;
  accountName: string;
  categoryName?: string;
}

export type TransactionCreate = {
  date: string | Date;
  description: string;
  amount: number;
  account: number;
}

export type TransactionUpdate = {
  id: number;
  date?: string;
  description?: string;
  amount?: number;
  account?: number;
  categoryName?: string;
}

export type TransactionAPIErrors = {
  date?: Array<string>;
  description?: Array<string>;
  amount?: Array<string>;
  account?: Array<string>;
  category?: Array<string>;
  file?: Array<string>;
  nonFieldErrors?: Array<string>;
  detail?: string;
}
