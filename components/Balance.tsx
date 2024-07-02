import getUserBalance from '@/app/actions/getUserBalance';
import countryToCurrency from 'country-to-currency';
import { getFormatter, getTranslations } from 'next-intl/server';

const Balance = async () => {
  const { balance, error } = await getUserBalance();

  const t = await getTranslations('Balance');

  if (!error) {
    const format = await getFormatter();
    const formattedBalance: string = format.number(balance ?? 0, {
      style: 'currency',
      currency: countryToCurrency[t('countryCode')],
    });

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
