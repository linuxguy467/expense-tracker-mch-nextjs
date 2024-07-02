'use client';

import addTransaction from '@/app/actions/addTransaction';
import { TransactionResult } from '@/types/Transactions';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { data, error }: TransactionResult = await addTransaction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success('Transaction added');
      formRef.current?.reset();
    }
  };

  const t = useTranslations('AddTransaction');

  return (
    <>
      <h3>{t('addTransactionHeading')}</h3>
      <form ref={formRef} action={clientAction}>
        <div className='form-control'>
          <label htmlFor='text'>{t('textPrompt')}</label>
          <input
            type='text'
            name='text'
            id='text'
            placeholder={t('textPlaceholder')}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            {t('amountPrompt')} <br /> {t('amountDirective')}
          </label>
          <input
            type='number'
            name='amount'
            id='amount'
            placeholder={t('amountPlaceholder')}
            step='0.01'
          />
        </div>
        <button className='btn'>{t('addTransactionButton')}</button>
      </form>
    </>
  );
};

export default AddTransaction;
