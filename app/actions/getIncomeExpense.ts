'use server';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

async function getIncomeExpense(): Promise<{
  income?: number;
  expense?: number;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  } else {
    try {
      const res: [{ income: number; expense: number }] =
        await db.$queryRawUnsafe(
          `SELECT
            SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS Income,
            ABS(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END)) AS Expense
           FROM "Transaction" t
           WHERE t."userId" = $1;`,
          userId
        );

      return {
        income: res[0].income ?? 0,
        expense: res[0].expense ?? 0,
      };
    } catch (error) {
      console.error(error);
      return { error: 'Database error' };
    }
  }
}

export default getIncomeExpense;
