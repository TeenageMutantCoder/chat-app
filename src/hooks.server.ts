import { getUser } from '$lib/chat.server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const userId = event.cookies.get('userId');
  const user = userId ? getUser(userId) : null;
  event.locals.user = user;
  return resolve(event);
};
