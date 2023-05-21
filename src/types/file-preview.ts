export type TransactionPreview = {
  date: string;
  amount: number;
  description: string;
  currencyCode: string;
}

export type AccountTransactionsPreview = {
  id: number;
  kind: string;
  transactions: TransactionPreview[]
}
