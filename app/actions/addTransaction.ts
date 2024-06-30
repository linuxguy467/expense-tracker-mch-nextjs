'use server';

import { auth } from '@clerk/nextjs/server';
import { TransactionData, TransactionResult } from '@/types/Transactions';

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');

  // Check for input values
  if (!textValue || textValue === '' || !amountValue) {
    return { error: 'Text or amount is missing' };
  } else {
    const text: string = textValue.toString(); // Ensure text is string
    const amount: number = parseFloat(amountValue.toString()); // Parse amount as number

    // Get logged in user
    const { userId } = auth();

    // check for user
    if (!userId) {
      return { error: 'User not found' };
    } else {
      const transactionData: TransactionData = {
        text,
        amount,
      };

      return { data: transactionData };
    }
  }
}

export default addTransaction;
