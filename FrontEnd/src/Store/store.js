import { configureStore, findNonSerializableValue } from '@reduxjs/toolkit';
import userReducer from './Slices/user.slice';
import messageReducer from './Slices/message.slice';
import socketReducer from './Slices/socket.slice';
const myStore = configureStore({
  reducer: { userReducer, messageReducer, socketReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      },
    }),

});
export default myStore;
