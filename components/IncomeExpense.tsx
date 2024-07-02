import getIncomeExpense from '@/app/actions/getIncomeExpense';
import countryToCurrency from 'country-to-currency';
import { getFormatter, getTranslations } from 'next-intl/server';

const IncomeExpense = async () => {
  const { income, expense, error } = await getIncomeExpense();

  const t = await getTranslations('IncomeExpense');
  const tIndex = await getTranslations('Index');

  if (!error) {
    const format = await getFormatter();
    const formattedIncome: string = format.number(income ?? 0, {
      style: 'currency',
      currency: countryToCurrency[tIndex('countryCode')],
    });

    const formattedExpense: string = format.number(expense ?? 0, {
      style: 'currency',
      currency: countryToCurrency[tIndex('countryCode')],
    });

    return (
      <div className='inc-exp-container'>
        <div>
          <h4>{t('incomeHeading')}</h4>
          <p className='money plus'>{formattedIncome}</p>
        </div>
        <div>
          <h4>{t('expenseHeading')}</h4>
          <p className='money minus'>{formattedExpense}</p>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <h4>{t('incomeExpenseErrorHeading')}</h4>
        <p>{error}</p>
      </>
    );
  }
};

export default IncomeExpense;
