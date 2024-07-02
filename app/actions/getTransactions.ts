'use server';

import { db } from '@/lib/db';
import { Transaction } from '@/types/Transaction';
import { auth } from '@clerk/nextjs/server';

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

      return { transactions };
    } catch (error) {
      console.error(error);
      return { error: 'Database error' };
    }
  }
}

export default getTransactions;
