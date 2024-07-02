import getFormattedAmount from '@/app/actions/getFormattedAmount';
import getUserBalance from '@/app/actions/getUserBalance';
import { getTranslations } from 'next-intl/server';

const Balance = async () => {
  const { balance, error } = await getUserBalance();

  const t = await getTranslations('Balance');

  if (!error) {
    const { formattedAmount: formattedBalance } = await getFormattedAmount(
      balance ?? 0
    );

    return (
      <>
        <h4>{t('heading')}</h4>
        <h1>{formattedBalance}</h1>
      </>
    );
  } else {
    return (
      <>
        <h4>{t('balanceErrorHeading')}</h4>
        <h1>{error}</h1>
      </>
    );
  }
};

export default Balance;
