import { getTranslations } from 'next-intl/server';

const IncomeExpense = async () => {
  const t = await getTranslations('IncomeExpense');

  return (
    <div className='inc-exp-container'>
      <div>
        <h4>{t('incomeHeading')}</h4>
        <p className='money plus'>$700</p>
      </div>
      <div>
        <h4>{t('expenseHeading')}</h4>
        <p className='money minus'>$200</p>
      </div>
    </div>
  );
};

export default IncomeExpense;
