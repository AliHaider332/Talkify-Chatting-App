import { createSlice } from '@reduxjs/toolkit';
import { getAllMessageThunk, sendMessageThunk } from './message.thunk';

const initialState = {
  messages: [],
  screenLoading: true,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, actions) => {
      state.messages.push(actions.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMessageThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getAllMessageThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.messages = action.payload;
    });
    builder.addCase(getAllMessageThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.screenLoading = false;
      state.messages.push(action.payload);
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });
  },
});

export const {addMessage}=messageSlice.actions
export default messageSlice.reducer;
