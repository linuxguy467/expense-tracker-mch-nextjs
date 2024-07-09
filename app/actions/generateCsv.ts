'use server';

import { db } from '@/lib/db';
import {
  generateCsvTimestamp,
  generateTimestamp,
} from '@/lib/generateTimestamp';
import { TransactionCsvData } from '@/types/Transactions';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import Papa from 'papaparse';

async function generateCsv(): Promise<{
  csvStr?: string;
  timestamp?: string;
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

      const user = await db.user.findFirst({
        where: { clerkUserId: userId },
      });

      const totalBalance = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );

      const totalExpense = transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      const totalIncome = transactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      const transactionData: TransactionCsvData[] = transactions.map(
        (transaction) => ({
          'Transaction Text': transaction.text,
          'Transaction Amount': transaction.amount,
          "User's Name": `${user?.name}`,
          'Created At': generateCsvTimestamp(transaction.created_at),
          'Total Balance': '',
          'Total Income': '',
          'Total Expense': '',
        })
      );

      // Totals appear after the first transaction
      transactionData[0]['Total Balance'] = totalBalance.toFixed(2);
      transactionData[0]['Total Income'] = totalIncome.toFixed(2);
      transactionData[0]['Total Expense'] = Math.abs(totalExpense).toFixed(2);

      const csvStr: string = Papa.unparse(transactionData, {
        header: true,
        escapeFormulae: true,
        delimiter: ',',
        quoteChar: '"',
      });

      const timestamp = generateTimestamp(new Date());

      revalidatePath('/');

      return { csvStr, timestamp };
    } catch (error) {
      console.error(error);
      return { error: 'Database error' };
    }
  }
}

export default generateCsv;
