'use client';

import deleteTransaction from '@/app/actions/deleteTransaction';
import { Transaction } from '@/types/Transaction';
import { toast } from 'react-toastify';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this transaction?'
    );

    if (!confirmed) return;

    const { message, error } = await deleteTransaction(transactionId);

    if (!error) {
      toast.success(message);
    } else {
      toast.error(error);
    }
  };

  return (
    <li className={transaction.className}>
      {transaction.text}
      <span>
        {transaction.className !== 'minus' ? '+' : ''}
        {transaction.amount}
      </span>
      <button
        onClick={() => handleDeleteTransaction(transaction.id)}
        className='delete-btn'
      >
        x
      </button>
    </li>
  );
};

export default TransactionItem;
