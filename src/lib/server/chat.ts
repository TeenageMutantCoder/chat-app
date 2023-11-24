import type { Message, User } from '$lib/chat';
import { randomUUID } from 'crypto';
import { pusher } from '$lib/server/pusher';

const messages: Message[] = [];
const users = new Map<User['id'], User>();

export const getUser = (id: User['id']) => {
  return users.get(id) ?? null;
};

export const createUser = () => {
  const id = randomUUID();
  const user = {
    id,
    name: `User ${users.size + 1}`
  };
  users.set(id, user);
  return user;
};

export const createMessage = (text: Message['text'], user: User) => {
  const message: Message = {
    id: randomUUID(),
    userId: user.id,
    text,
    createdAt: new Date().toISOString()
  };
  messages.push(message);

  pusher.trigger('chat', 'message:new', {
    userId: user.id
  });

  return message;
};

export const getMessages = () => {
  return messages.map((message) => {
    return {
      ...message,
      user: { ...getUser(message.userId)! }
    };
  });
};
