'use server';

export type Transaction = {
  id: string;
  text: string;
  amount: string;
  userId: string;
  className?: string;
  created_at: Date;
};
