import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { checkUser } from '@/lib/checkUser';
import { useTranslations } from 'next-intl';

const Header = () => {
  let user;

  checkUser()
    .then((data) => (user = data))
    .catch((err) => console.error(err));

  const t = useTranslations('Header');

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
