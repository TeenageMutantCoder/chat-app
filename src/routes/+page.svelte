<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Action } from 'svelte/action';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { pusher } from '$lib/pusher';
	import type { Message, User } from '$lib/chat';
	import { invalidate } from '$app/navigation';

	export let data: PageData;
	let messages = data.messages;

	const getUpdatedMessages = (newMessages: typeof messages) => {
		const unsavedMessages = newMessages.filter((newMessage) => {
			return !messages.some((existingMessage) => existingMessage.id === newMessage.id);
		});
		messages = messages.concat(unsavedMessages);
	};

	$: getUpdatedMessages(data.messages);
	$: currentUser = data.user;
	$: sortedMessages = messages.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));

	const scrollToBottom: Action<HTMLElement, unknown> = (node) => {
		const scroll = () =>
			node.scroll({
				top: node.scrollHeight,
				behavior: 'smooth'
			});
		scroll();

		return {
			update: scroll
		};
	};

	onMount(() => {
		const channel = pusher.subscribe('chat');

		type MessageNewData = {
			message: Message;
			user: User;
		};
		channel.bind('message:new', (data: MessageNewData) => {
			const message = { ...data.message, user: data.user };
			getUpdatedMessages([message]);
		});

		const visibilityChangeHandler = () => {
			if (document.visibilityState === 'visible') {
				invalidate('messages')
			}
		};
		document.addEventListener('visibilitychange', visibilityChangeHandler);

		return () => {
			channel.unbind();
			document.removeEventListener('visibilitychange', visibilityChangeHandler);
		};
	});
</script>

<div
	class="mx-auto w-3/4 h-screen overflow-y-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl p-4 flex flex-col"
>
	<h1 class="text-2xl text-center font-semibold">Chatroom</h1>

	<div class="flex-1 overflow-y-auto break-words" use:scrollToBottom={sortedMessages}>
		{#each sortedMessages as message, index}
			{@const isMyMessage = message.user.id === currentUser.id}
			<div class="m-2">
				<p class="text-lg">{message.text}</p>
				<span class="text-xs text-gray-600" class:font-bold={isMyMessage}>
					{isMyMessage ? 'Me' : message.user.name}
				</span>
			</div>
			{#if index !== sortedMessages.length - 1}
				<hr class="mx-2 border-gray-500" />
			{/if}
		{:else}
			<p>No messages here, yet.</p>
		{/each}
	</div>
	<form method="POST" class="flex mt-3" use:enhance>
		<input
			name="text"
			type="text"
			class="flex-1 p-2"
			placeholder="Enter your message here..."
			required
		/>
		<button class="ml-2 bg-gray-800 rounded-xl h-fit p-2 text-gray-200 font-medium">Send</button>
	</form>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.700);
	}
</style>
