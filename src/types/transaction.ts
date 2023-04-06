export type Transaction = {
  id: number;
  date: string;
  description: string;
  currencyCode: string;
  amount: number;
  dateClassified: string | null;
  user: number;
  account: number;
  categoryName: string | null;
  categoryDetailedName: string | null;
}

export type TransactionAPIErrors = {
  date?: Array<string>;
  description?: Array<string>;
  amount?: Array<string>;
  account?: Array<string>;
  nonFieldErrors?: Array<string>;
  detail?: string;
}
