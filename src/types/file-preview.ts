export type TransactionPreview = {
  date: string;
  amount: number;
  description: string;
  currencyCode: string;
}

export type AccountTransactionsPreview = {
  kind: string;
  transactions: TransactionPreview[]
}
