import { createMessage, createUser, getMessages } from '$lib/chat.server';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	let user = event.locals.user;
	if (!user) {
		const newUser = createUser();
		event.cookies.set('userId', newUser.id);
		event.locals.user = newUser;
		user = newUser;
	}
	const messages = getMessages();

	return { user, messages };
};

export const actions: Actions = {
	default: async (event) => {
		const user = event.locals.user;
		if (!user) {
			return fail(401, {
				error: 'You are not authenticated.'
			});
		}

		const formData = await event.request.formData();
		const messageText = formData.get('text');

		if (!messageText) {
			return fail(400, {
				error: '"text" is missing from the request body.'
			});
		}

		if (typeof messageText !== 'string') {
			return fail(400, {
				error: '"text" should be a string.'
			});
		}

		const message = createMessage(messageText, user);
		return { message };
	}
};
