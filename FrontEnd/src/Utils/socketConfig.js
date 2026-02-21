// Utils/initSocket.js
import { io } from 'socket.io-client';

let socket;
export const initSocket = (userID) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL, { query: { userID } });
  }
  return socket;
};

export const getSocket = () => socket;
