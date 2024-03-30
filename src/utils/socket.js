import {io} from 'socket.io-client';
import Config from '../configuration';
export const socket = io(Config.socketHost);
// export const socket = io('http://192.168.10.20:4000', {
//   transports: ['websocket'],
//   reconnection: true,
//   autoConnect: true,
//   reconnectionDelay: 10000,
// });
