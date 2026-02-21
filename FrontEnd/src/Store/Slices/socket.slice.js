import { createSlice } from '@reduxjs/toolkit';
import { initSocket } from '../../Utils/socketConfig';

const initialState = {
  socket: null,
  onlineUser: [],
};

const socket = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    socketConnection: (state, actions) => {
      state.socket = initSocket(actions.payload);
    },
    setOnlineUsers: (state, actions) => {
      state.onlineUser =actions.payload;
    },
  },
});
export const { socketConnection, setOnlineUsers } = socket.actions;
export default socket.reducer;
