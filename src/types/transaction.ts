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
  categoryName: string | null;
  categoryDetailedName: string | null;
}

export type TransactionCreate = {
  date: string;
  description: string;
  amount: number;
  account: number;
}

export type TransactionAPIErrors = {
  date?: Array<string>;
  description?: Array<string>;
  amount?: Array<string>;
  account?: Array<string>;
  nonFieldErrors?: Array<string>;
  detail?: string;
}
