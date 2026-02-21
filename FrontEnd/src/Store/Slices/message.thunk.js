import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Utils/axios.setup';

export const getAllMessageThunk = createAsyncThunk(
  'message/getAllMessageThunk',
  async (receiver, { rejectWithValue }) => {
    try {
      const conversation = await axiosInstance(`/get-conversation/${receiver}`);
      return conversation?.data.responseData || [];
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  }
);

export const sendMessageThunk = createAsyncThunk(
  'message/sendMessageThunk',
  async ({receiver, message}, { rejectWithValue }) => {
    try {
      
      
      const conversation = await axiosInstance.post(
        `/add-message/${receiver}`,
        { message }
      );
      
      
      return conversation?.data.responseData;
    } catch (error) {
      return rejectWithValue('Something went wrong');
    }
  }
);
