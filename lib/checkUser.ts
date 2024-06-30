import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export const checkUser = async () => {
  const user = await currentUser();
  console.log(user);

  // Check for current logged in clerk user
  if (!user) {
    return null;
  } else {
    // Check if user is already in the database
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    // If user is in db, return user
    if (loggedInUser) {
      return loggedInUser;
    } else {
      // If not in db, create new user
      const newUser = await db.user.create({
        data: {
          clerkUserId: user.id,
          name: `${user.firstName} ${user.lastName}`,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
        },
      });

      return newUser;
    }
  }
};
