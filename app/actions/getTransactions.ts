'use server';

import { db } from '@/lib/db';
import { Transaction } from '@/types/Transaction';
import { auth } from '@clerk/nextjs/server';
import getFormattedAmount from './getFormattedAmount';

async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  } else {
    try {
      const transactions = await db.transaction.findMany({
        where: { userId },
        orderBy: {
          created_at: 'desc',
        },
      });

      const formattedTransactions: Transaction[] = [];
      for (const transaction of transactions) {
        const { formattedAmount } = await getFormattedAmount(
          transaction.amount ?? 0
        );
        formattedTransactions.push({
          id: transaction.id,
          text: transaction.text,
          amount: formattedAmount ?? '',
          userId: transaction.userId,
          className: transaction.amount < 0 ? 'minus' : 'plus',
          created_at: transaction.created_at,
        });
      }

      return { transactions: formattedTransactions };
    } catch (error) {
      console.error(error);
      return { error: 'Database error' };
    }
  }
}

export default getTransactions;
