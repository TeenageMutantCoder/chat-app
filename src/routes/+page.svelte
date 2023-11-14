<script lang="ts">
	import postcss from 'postcss';

	type User = {
		id: number;
		name: string;
	};
	type Message = {
		id: number;
		userId: number;
		body: string;
		user: User;
	};

	let messages: Message[] = [];

	const user1: User = {
		id: 1,
		name: 'User 1'
	};
	const user2: User = {
		id: 2,
		name: 'User 2'
	};

	messages.push({ id: 1, userId: 1, body: 'test1 from 1', user: user1 });
	messages.push({ id: 2, userId: 1, body: 'test2 from 1', user: user1 });
	messages.push({ id: 3, userId: 2, body: 'test3 from 2', user: user2 });
	messages.push({ id: 4, userId: 1, body: 'test4 from 1', user: user1 });

	let nextId = 5;

	const sendMessage = (text: string) => {
		messages.push({ id: nextId, userId: 2, body: text, user: user2 });
		messages = messages;
		messageText = '';
	};

	let messageText: string;
</script>

<div class="mx-auto w-3/4 h-screen  overflow-y-auto bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl p-4 flex flex-col">
	<h1 class="text-2xl text-center font-semibold">Chatroom</h1>

	<div class="flex-1 overflow-y-auto break-words">
		{#each messages as message, index}
			<div class="m-2">
				<p class="text-lg">{message.body}</p>
				<span class="text-xs text-gray-600">{message.user.name}</span>
			</div>
			{#if index !== messages.length - 1}
				<hr class="mx-2 border-gray-500" />
			{/if}
		{/each}
	</div>
	<div class="flex mt-3">
		<input
			type="text"
			class="flex-1 p-2"
			bind:value={messageText}
			on:keydown={(e) => {
				if (e.key === 'Enter') sendMessage(e.currentTarget.value);
			}}
			placeholder="Enter your message here..."
			required
		/>
		<button
			class="ml-2 bg-gray-800 rounded-xl h-fit p-2 text-gray-200 font-medium"
			on:click={() => {
				sendMessage(messageText);
			}}>Send</button
		>
	</div>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.700);
	}
</style>
