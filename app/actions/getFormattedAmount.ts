'use server';

import { auth } from '@clerk/nextjs/server';
import countryToCurrency from 'country-to-currency';
import { getFormatter, getTranslations } from 'next-intl/server';

async function getFormattedAmount(amount: number): Promise<{
  formattedAmount?: string;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  } else {
    try {
      const format = await getFormatter();
      const tIndex = await getTranslations('Index');

      const formattedAmount = format.number(amount, {
        style: 'currency',
        currency:
          countryToCurrency[
            tIndex('countryCode') as keyof typeof countryToCurrency
          ],
      });

      return { formattedAmount };
    } catch (error) {
      console.error(error);
      return { error: 'Error with formatting amount to currency' };
    }
  }
}

export default getFormattedAmount;
