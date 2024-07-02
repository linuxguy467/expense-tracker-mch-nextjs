import getUserBalance from '@/app/actions/getUserBalance';
import countryToCurrency from 'country-to-currency';
import { getFormatter, getTranslations } from 'next-intl/server';

interface Props {
  countryCode: string;
}

const Balance = async ({ countryCode }: Props) => {
  const { balance } = await getUserBalance();

  const format = await getFormatter();
  const formattedBalance = format.number(balance, {
    style: 'currency',
    currency: countryToCurrency[countryCode],
  });

  const t = await getTranslations('Balance');

  return (
    <>
      <h4>{t('heading')}</h4>
      <h1>{formattedBalance}</h1>
    </>
  );
};

export default Balance;
