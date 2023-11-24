import Pusher from 'pusher';
import {
  PUSHER_APP_ID,
  PUSHER_KEY,
  PUSHER_SECRET,
  PUSHER_CLUSTER,
  PUSHER_USE_TLS
} from '$env/static/private';

export const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  useTLS: PUSHER_USE_TLS === 'true' ? true : false
});
