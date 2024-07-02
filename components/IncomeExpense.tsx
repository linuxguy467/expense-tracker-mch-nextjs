import getIncomeExpense from '@/app/actions/getIncomeExpense';
import { getTranslations } from 'next-intl/server';

const IncomeExpense = async () => {
  const { income, expense, error } = await getIncomeExpense();

  const t = await getTranslations('IncomeExpense');

  if (!error) {
    return (
      <div className='inc-exp-container'>
        <div>
          <h4>{t('incomeHeading')}</h4>
          <p className='money plus'>{income}</p>
        </div>
        <div>
          <h4>{t('expenseHeading')}</h4>
          <p className='money minus'>{expense}</p>
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
