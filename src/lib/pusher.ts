import { dev } from '$app/environment';
import { PUBLIC_PUSHER_CLUSTER, PUBLIC_PUSHER_KEY } from '$env/static/public';
import Pusher from 'pusher-js';

if (dev) {
  Pusher.logToConsole = true;
}

export const pusher = new Pusher(PUBLIC_PUSHER_KEY, {
  cluster: PUBLIC_PUSHER_CLUSTER
});
