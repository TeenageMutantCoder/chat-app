<script lang="ts">
	import postcss from 'postcss';
	import { enhance } from '$app/forms';
	import type { Action } from 'svelte/action';
	import type { PageData } from './$types';
	export let data: PageData;

	$: messages = data.messages;
	$: user = data.user;

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
</script>

<div
	class="mx-auto w-3/4 h-screen overflow-y-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl p-4 flex flex-col"
>
	<h1 class="text-2xl text-center font-semibold">Chatroom</h1>

	<div class="flex-1 overflow-y-auto break-words" use:scrollToBottom={messages}>
		{#each messages as message, index}
			{@const isMyMessage = message.user.id === user.id}
			<div class="m-2">
				<p class="text-lg">{message.text}</p>
				<span class="text-xs text-gray-600" class:font-bold={isMyMessage}>
					{isMyMessage ? 'Me' : message.user.name}
				</span>
			</div>
			{#if index !== messages.length - 1}
				<hr class="mx-2 border-gray-500" />
			{/if}
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
