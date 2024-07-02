import getTransactions from '@/app/actions/getTransactions';
import { Transaction } from '@/types/Transaction';
import { getTranslations } from 'next-intl/server';

const TransactionList = async () => {
  const { transactions, error } = await getTransactions();
  const t = await getTranslations('TransactionList');

  return !error ? (
    <>
      <h3>{t('heading')}</h3>
      <ul className='list'>
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <p>{transaction.text}</p>
          ))}
      </ul>
    </>
  ) : (
    <>
      <h3>{t('errorHeading')}</h3>
      <p className='error'>{error}</p>
    </>
  );
};

export default TransactionList;
