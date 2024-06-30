'use server';

export type TransactionData = {
  text: string;
  amount: number;
};

export type TransactionResult = {
  data?: TransactionData;
  error?: string;
};
