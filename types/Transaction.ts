'use server';

export type Transaction = {
  id: string;
  text: string;
  amount: number;
  userId: string;
  created_at: Date;
};
