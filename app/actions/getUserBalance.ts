'use server';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import getFormattedAmount from '@/app/actions/getFormattedAmount';

async function getUserBalance(): Promise<{
  balance?: string;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  } else {
    try {
      const transactions = await db.transaction.findMany({
        where: { userId },
      });

      const balance = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      const { formattedAmount: formattedBalance } = await getFormattedAmount(
        balance ?? 0
      );

      return { balance: formattedBalance ?? '' };
    } catch (error) {
      console.error(error);
      return { error: 'Database error' };
    }
  }
}

export default getUserBalance;
