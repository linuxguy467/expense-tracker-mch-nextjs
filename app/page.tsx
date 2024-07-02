import { currentUser } from '@clerk/nextjs/server';
import Guest from '@/components/Guest';
import AddTransaction from '@/components/AddTransaction';
import Balance from '@/components/Balance';
import IncomeExpense from '@/components/IncomeExpense';
import { getTranslations } from 'next-intl/server';
import TransactionList from '@/components/TransactionList';

const HomePage = async () => {
  const user = await currentUser();

  const t = await getTranslations('HomePage');

  return !user ? (
    <Guest />
  ) : (
    <main>
      <h2>
        {t('greeting')}, {user.firstName}
      </h2>
      <Balance />
      <IncomeExpense />
      <AddTransaction />
      <TransactionList />
    </main>
  );
};

export default HomePage;
