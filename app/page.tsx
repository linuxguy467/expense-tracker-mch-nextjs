import { currentUser } from '@clerk/nextjs/server';
import Guest from '@/components/Guest';
import AddTransaction from '@/components/AddTransaction';
import Balance from '@/components/Balance';
import { getTranslations } from 'next-intl/server';

const HomePage = async () => {
  const user = await currentUser();

  const t = await getTranslations('Index');

  return !user ? (
    <Guest />
  ) : (
    <main>
      <h2>Welcome, {user.firstName}</h2>
      <Balance countryCode={t('countryCode')} />
      <AddTransaction />
    </main>
  );
};

export default HomePage;
