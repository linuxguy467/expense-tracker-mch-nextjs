import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { checkUser } from '@/lib/checkUser';
import { getTranslations } from 'next-intl/server';

const Header = async () => {
  const user = await checkUser();

  const t = await getTranslations('Header');

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <h2>{t('title')}</h2>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Header;
