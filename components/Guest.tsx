import { SignInButton } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

const Guest = () => {
  const t = useTranslations('Guest');

  return (
    <div className='guest'>
      <h1>{t('heading')}</h1>
      <p>{t('signInPrompt')}</p>
      <SignInButton />
    </div>
  );
};

export default Guest;
