'use server';

export type TransactionData = {
  text: string;
  amount: number;
};

export type TransactionResult = {
  data?: TransactionData;
  error?: string;
};

export type TransactionCsvData = {
  'Transaction Text': string;
  'Transaction Amount': number;
  "User's Name": string;
  'Created At': string;
  'Total Balance': string;
  'Total Income': string;
  'Total Expense': string;
};
